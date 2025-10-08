/**
 * Animation Utilities
 * Provides helper functions for consistent animations across the application
 */

/**
 * Calculate stagger delay for entrance animations
 * @param index - The index of the element in the array
 * @param delayMs - Delay in milliseconds between each element (default: 100ms)
 * @returns Style object with animationDelay
 * 
 * @example
 * {items.map((item, index) => (
 *   <div key={item.id} style={getStaggerDelay(index)}>
 *     {item.content}
 *   </div>
 * ))}
 */
export function getStaggerDelay(index: number, delayMs: number = 100) {
  return {
    animationDelay: `${index * delayMs}ms`,
  };
}

/**
 * Calculate stagger delay as a string value
 * @param index - The index of the element in the array
 * @param delayMs - Delay in milliseconds between each element (default: 100ms)
 * @returns Delay string (e.g., "200ms")
 */
export function getStaggerDelayString(index: number, delayMs: number = 100): string {
  return `${index * delayMs}ms`;
}

/**
 * Animation variant presets for common animations
 */
export const animationVariants = {
  fadeInUp: "animate-fade-in-up",
  shake: "animate-shake",
  bounceOnce: "animate-bounce-once",
} as const;

/**
 * Get animation class with optional stagger delay
 * @param variant - Animation variant from animationVariants
 * @param index - Optional index for stagger effect
 * @param delayMs - Optional delay in milliseconds (default: 100ms)
 * @returns Object with className and style
 * 
 * @example
 * <div {...getAnimationProps('fadeInUp', index)}>
 *   Content
 * </div>
 */
export function getAnimationProps(
  variant: keyof typeof animationVariants,
  index?: number,
  delayMs: number = 100
) {
  const className = animationVariants[variant];
  const style = index !== undefined ? getStaggerDelay(index, delayMs) : undefined;

  return {
    className,
    style,
  };
}

/**
 * Duration constants matching CSS custom properties
 */
export const durations = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

/**
 * Easing function constants
 */
export const easings = {
  easeOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeSpring: "cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

/**
 * Check if user prefers reduced motion
 * @returns true if user has motion preference set to reduce
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Get transition style object
 * @param property - CSS property to transition (default: "all")
 * @param duration - Duration key from durations object (default: "normal")
 * @param easing - Easing key from easings object (default: "easeOut")
 * @returns CSS style object for transition
 * 
 * @example
 * <div style={getTransitionStyle("transform", "fast")}>
 *   Hover me
 * </div>
 */
export function getTransitionStyle(
  property: string = "all",
  duration: keyof typeof durations = "normal",
  easing: keyof typeof easings = "easeOut"
) {
  if (prefersReducedMotion()) {
    return { transition: "none" };
  }

  return {
    transition: `${property} ${durations[duration]}ms ${easings[easing]}`,
  };
}
