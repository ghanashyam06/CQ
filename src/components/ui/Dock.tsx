"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type SpringOptions,
} from "framer-motion";
import {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import "./Dock.css";

export interface DockItemData {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

interface DockItemProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  spring: SpringOptions;
  distance: number;
  magnification: number;
  baseItemSize: number;
  label: string;
}

function DockItem({
  children,
  className = "",
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
  label,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseItemSize };
    return val - rect.x - baseItemSize / 2;
  });

  // Only animate the WIDTH — height is auto so label never overflows
  const targetWidth = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const width = useSpring(targetWidth, spring);

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`dock-item ${className}`}
      tabIndex={0}
      role="button"
      aria-label={label}
    >
      {Children.map(children, (child) =>
        cloneElement(child as ReactElement<{ isHovered: typeof isHovered }>, { isHovered })
      )}
      <span className="dock-item-label">{label}</span>
    </motion.div>
  );
}

interface DockTooltipProps {
  children: ReactNode;
  className?: string;
  isHovered?: ReturnType<typeof useMotionValue<number>>;
}

function DockTooltip({ children, className = "", isHovered }: DockTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on("change", (latest) => setIsVisible(latest === 1));
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: -4 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.15 }}
          className={`dock-label ${className}`}
          role="tooltip"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface DockIconProps {
  children: ReactNode;
  className?: string;
  isHovered?: ReturnType<typeof useMotionValue<number>>;
}

function DockIcon({ children, className = "" }: DockIconProps) {
  return <div className={`dock-icon ${className}`}>{children}</div>;
}

interface DockProps {
  items: DockItemData[];
  className?: string;
  spring?: SpringOptions;
  magnification?: number;
  distance?: number;
  panelHeight?: number;
  dockHeight?: number;
  baseItemSize?: number;
}

export default function Dock({
  items,
  className = "",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 90,
  distance = 160,
  panelHeight = 80,
  dockHeight = 80,
  baseItemSize = 72,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  // Keep outer height stable — no vertical animation needed since height is auto
  const maxHeight = useMemo(
    () => Math.max(dockHeight, panelHeight),
    [dockHeight, panelHeight]
  );

  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div style={{ height, scrollbarWidth: "none" }} className="dock-outer">
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={`dock-panel ${className}`}
        role="toolbar"
        aria-label="Navigation dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
            label={item.label}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockTooltip>{item.label}</DockTooltip>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}
