"use client";

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
} from "react";
import gsap from "gsap";
import styles from "./card-swap.module.css";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  customClass?: string;
};

type CardSwapProps = {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  autoPlay?: boolean;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  skewAmount?: number;
  easing?: "linear" | "elastic";
  children: React.ReactNode;
};

type CardElementProps = React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.Ref<HTMLDivElement>;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, className, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={[styles.card, customClass, className].filter(Boolean).join(" ")}
    />
  ),
);

Card.displayName = "Card";

const makeSlot = (index: number, distX: number, distY: number, total: number) => ({
  x: index * distX,
  y: -index * distY,
  z: -index * distX * 1.5,
  zIndex: total - index,
});

const placeNow = (
  element: HTMLDivElement | null,
  slot: ReturnType<typeof makeSlot>,
  skew: number,
) => {
  if (!element) {
    return;
  }

  gsap.set(element, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });
};

export default function CardSwap({
  width = 500,
  height = 400,
  cardDistance = 44,
  verticalDistance = 54,
  delay = 3600,
  autoPlay = true,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 3,
  easing = "linear",
  children,
}: CardSwapProps) {
  const config = useMemo(
    () =>
      easing === "elastic"
        ? {
            ease: "elastic.out(0.6,0.9)",
            durDrop: 1.6,
            durMove: 1.6,
            durReturn: 1.6,
            promoteOverlap: 0.82,
            returnDelay: 0.05,
          }
        : {
            ease: "power2.inOut",
            durDrop: 0.72,
            durMove: 0.72,
            durReturn: 0.72,
            promoteOverlap: 0.4,
            returnDelay: 0.12,
          },
    [easing],
  );

  const childrenArray = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childrenArray.map(() => React.createRef<HTMLDivElement>()),
    [childrenArray],
  );

  const orderRef = useRef(Array.from({ length: childrenArray.length }, (_, index) => index));
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const total = refs.length;

    refs.forEach((ref, index) => {
      placeNow(ref.current, makeSlot(index, cardDistance, verticalDistance, total), skewAmount);
    });

    const swap = () => {
      if (orderRef.current.length < 2) {
        return;
      }

      const [front, ...rest] = orderRef.current;
      const frontElement = refs[front].current;

      if (!frontElement) {
        return;
      }

      const timeline = gsap.timeline();
      timelineRef.current = timeline;

      timeline.to(frontElement, {
        y: "+=220",
        duration: config.durDrop,
        ease: config.ease,
      });

      timeline.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);

      rest.forEach((index, restIndex) => {
        const element = refs[index].current;
        const slot = makeSlot(restIndex, cardDistance, verticalDistance, refs.length);

        if (!element) {
          return;
        }

        timeline.set(element, { zIndex: slot.zIndex }, "promote");
        timeline.to(
          element,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${restIndex * 0.08}`,
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);

      timeline.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      timeline.call(() => {
        gsap.set(frontElement, { zIndex: backSlot.zIndex });
      }, undefined, "return");
      timeline.to(
        frontElement,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return",
      );
      timeline.call(() => {
        orderRef.current = [...rest, front];
      });
    };

    if (autoPlay) {
      swap();
      intervalRef.current = window.setInterval(swap, delay);
    }

    if (autoPlay && pauseOnHover && containerRef.current) {
      const node = containerRef.current;
      const pause = () => {
        timelineRef.current?.pause();
        if (intervalRef.current !== null) {
          window.clearInterval(intervalRef.current);
        }
      };
      const resume = () => {
        timelineRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };

      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);

      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        if (intervalRef.current !== null) {
          window.clearInterval(intervalRef.current);
        }
      };
    }

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [cardDistance, verticalDistance, delay, autoPlay, pauseOnHover, skewAmount, easing, refs, config]);

  const rendered = childrenArray.map((child, index) => {
    if (!isValidElement(child)) {
      return child;
    }

    const element = child as React.ReactElement<CardElementProps>;

    return cloneElement(element, {
      key: index,
      ref: refs[index],
      style: { width, height, ...(element.props.style ?? {}) },
      onClick: (event: React.MouseEvent<HTMLDivElement>) => {
        element.props.onClick?.(event);
        onCardClick?.(index);
      },
    });
  });

  return (
    <div ref={containerRef} className={styles.container} style={{ width, height }}>
      {rendered}
    </div>
  );
}
