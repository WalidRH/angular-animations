import { animate, animation, AnimationTriggerMetadata, keyframes, style, transition, trigger } from '@angular/animations';

import { IAnimationOptions, Easing } from '../common/interfaces';
import { useAnimationIncludingChildren } from '../common/use-animation-including-children';

const DEFAULT_DURATION = 1000;
const DEFAULT_EASING: Easing = 'ease';

export interface IFadeOutRightBigAnimationOptions extends IAnimationOptions {
  /**
   * Translate, possible units: px, %, em, rem, vw, vh
   *
   * Default: 2000px
   */
  translate?: string;

  /**
   * Easing
   *
   * Default: 'ease'
   */
  easing?: Easing;
}

const fadeOutRightBig = (easing: Easing = DEFAULT_EASING) =>
  animation([
    animate(
      '{{duration}}ms {{delay}}ms',
      keyframes([
        style({ opacity: 1, transform: 'translate3d(0, 0, 0)', easing, offset: 0 }),
        style({ opacity: 0, transform: 'translate3d({{translate}}, 0, 0)', easing, offset: 1 })
      ])
    )
  ]);

export function fadeOutRightBigAnimation(options?: IFadeOutRightBigAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'fadeOutRightBig', [
    transition('0 => 1', [...useAnimationIncludingChildren(fadeOutRightBig(options?.easing), options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
        translate: (options && options.translate) || '2000px'
      }
    })
  ]);
}

export function fadeOutRightBigOnLeaveAnimation(options?: IFadeOutRightBigAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'fadeOutRightBigOnLeave', [
    transition(':leave', [...useAnimationIncludingChildren(fadeOutRightBig(options?.easing), options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
        translate: (options && options.translate) || '2000px'
      }
    })
  ]);
}
