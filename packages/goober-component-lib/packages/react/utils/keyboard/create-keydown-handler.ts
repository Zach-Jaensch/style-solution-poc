export type HTMLElementWithDisabled = HTMLElement & { disabled?: boolean };

function findElementAncestor(
  element: HTMLElementWithDisabled,
  selector: string,
) {
  let _element: HTMLElementWithDisabled | null = element;

  while (_element && !_element.matches(selector)) {
    _element = _element?.parentElement || null;
  }
  return _element;
}

function getPreviousIndex(
  current: number,
  elements: HTMLElementWithDisabled[],
  loop: boolean,
) {
  for (let i = current - 1; i >= 0; i -= 1) {
    if (isEnabled(elements[i])) {
      return i;
    }
  }

  if (loop) {
    for (let i = elements.length - 1; i > -1; i -= 1) {
      if (isEnabled(elements[i])) {
        return i;
      }
    }
  }

  return current;
}

const isEnabled = (element: HTMLElementWithDisabled) => {
  return !element.disabled && !Boolean(element.getAttribute("aria-disabled"));
};

function getNextIndex(
  current: number,
  elements: HTMLElementWithDisabled[],
  loop: boolean,
) {
  for (let i = current + 1; i < elements.length; i += 1) {
    if (isEnabled(elements[i])) {
      return i;
    }
  }

  if (loop) {
    for (let i = 0; i < elements.length; i += 1) {
      if (isEnabled(elements[i])) {
        return i;
      }
    }
  }

  return current;
}

/**
 * Validates that target element is on the same level as sibling, used to filter
 * out children that have the same sibling selector
 */
function onSameLevel(
  target: HTMLElementWithDisabled,
  sibling: HTMLElementWithDisabled,
  parentSelector: string,
) {
  return (
    findElementAncestor(target, parentSelector) ===
    findElementAncestor(sibling, parentSelector)
  );
}

interface GetElementsSiblingsInput {
  /** Selector used to find parent node, e.g. '[data-sc-menu-list]' */
  parentSelector: string;

  /** Selector used to find element siblings, e.g. '[data-sc-menu-list-item]' */
  siblingSelector: string;

  /** Determines whether next/previous indices should loop. Defaults to true */
  loop?: boolean;

  /** Determines which arrow keys will be used. */
  orientation: "vertical" | "horizontal";

  /** Text direction. Defaults to ltr */
  dir?: "rtl" | "ltr";

  /**
   * Determines whether element should be clicked when focused with keyboard
   * event. Defaults to false
   */
  activateOnFocus?: boolean;

  /** External keydown event */
  onKeyDown?(event: React.KeyboardEvent<HTMLElementWithDisabled>): void;
}

export function createKeydownHandler({
  parentSelector,
  siblingSelector,
  onKeyDown,
  orientation,
  loop = true,
  activateOnFocus = false,
  dir = "ltr",
}: GetElementsSiblingsInput) {
  return (event: React.KeyboardEvent<HTMLElementWithDisabled>) => {
    onKeyDown?.(event);

    const elements = Array.from(
      findElementAncestor(
        event.currentTarget,
        parentSelector,
      )?.querySelectorAll<HTMLElementWithDisabled>(siblingSelector) || [],
    ).filter((node) => onSameLevel(event.currentTarget, node, parentSelector));

    const current = elements.findIndex((el) => event.currentTarget === el);
    const _nextIndex = getNextIndex(current, elements, loop);
    const _previousIndex = getPreviousIndex(current, elements, loop);
    const nextIndex = dir === "rtl" ? _previousIndex : _nextIndex;
    const previousIndex = dir === "rtl" ? _nextIndex : _previousIndex;

    // Based on keys provided here: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key#examples
    switch (event.key) {
      case "Right":
      case "ArrowRight": {
        if (orientation === "horizontal") {
          event.stopPropagation();
          event.preventDefault();
          elements[nextIndex].focus();
          if (activateOnFocus) {
            elements[nextIndex].click();
          }
        }

        break;
      }

      case "Left":
      case "ArrowLeft": {
        if (orientation === "horizontal") {
          event.stopPropagation();
          event.preventDefault();
          elements[previousIndex].focus();
          if (activateOnFocus) {
            elements[previousIndex].click();
          }
        }

        break;
      }

      case "Up":
      case "ArrowUp": {
        if (orientation === "vertical") {
          event.stopPropagation();
          event.preventDefault();
          elements[_previousIndex].focus();
          if (activateOnFocus) {
            elements[_previousIndex].click();
          }
        }

        break;
      }

      case "Down":
      case "ArrowDown": {
        if (orientation === "vertical") {
          event.stopPropagation();
          event.preventDefault();
          elements[_nextIndex].focus();
          if (activateOnFocus) {
            elements[_nextIndex].click();
          }
        }

        break;
      }

      case "Home": {
        event.stopPropagation();
        event.preventDefault();
        if (!elements[0].disabled) {
          elements[0].focus();
        }
        break;
      }

      case "End": {
        event.stopPropagation();
        event.preventDefault();
        const last = elements.length - 1;
        if (!elements[last].disabled) {
          elements[last].focus();
        }
        break;
      }

      case "Enter":
      case "Spacebar":
      case " ": {
        event.stopPropagation();
        event.preventDefault();
        event.currentTarget.click();
        break;
      }
    }
  };
}
