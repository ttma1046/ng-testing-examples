import { DebugElement } from '@angular/core';

export * from './async-observable-helpers';

// See https://developer.mozilla.org/docs/Web/API/MouseEvent/button
// #docregion click-event
/** Button events to pass to `DebugElement.triggerEventHandler` for RouterLink event handler */
export const ButtonClickEvents = {
  left: { button: 0 },
  right: { button: 2 },
};

/** Simulate element click. Defaults to mouse left-button click event. */
export function click(el: DebugElement | HTMLElement, eventObj = ButtonClickEvents.left): void {
  if (el instanceof HTMLElement) {
    el.click();
  } else {
    el.triggerEventHandler('click', eventObj);
  }
}
// #enddocregion click-event
