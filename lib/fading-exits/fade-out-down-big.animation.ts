import { animate, animation, AnimationTriggerMetadata, keyframes, style, transition, trigger } from '@angular/animations';

import { IAnimationOptions, Easing } from '../common/interfaces';
import { useAnimationIncludingChildren } from '../common/use-animation-including-children';

const DEFAULT_DURATION = 1000;
const DEFAULT_EASING: Easing = 'ease';

export interface IFadeOutDownBigAnimationOptions extends IAnimationOptions {
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

const fadeOutDownBig = (easing: Easing = DEFAULT_EASING) =>
  animation([
    animate(
      '{{duration}}ms {{delay}}ms',
      keyframes([
        style({ opacity: 1, transform: 'translate3d(0, 0, 0)', easing, offset: 0 }),
        style({ opacity: 0, transform: 'translate3d(0, {{translate}}, 0)', easing, offset: 1 })
      ])
    )
  ]);

export function fadeOutDownBigAnimation(options?: IFadeOutDownBigAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'fadeOutDownBig', [
    transition('0 => 1', [...useAnimationIncludingChildren(fadeOutDownBig(options?.easing), options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
        translate: (options && options.translate) || '2000px'
      }
    })
  ]);
}

export function fadeOutDownBigOnLeaveAnimation(options?: IFadeOutDownBigAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'fadeOutDownBigOnLeave', [
    transition(':leave', [...useAnimationIncludingChildren(fadeOutDownBig(options?.easing), options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
        translate: (options && options.translate) || '2000px'
      }
    })
  ]);
}
