package;

import haxe.ui.core.Component;
import haxe.ui.styles.Dimension;
import haxe.ui.styles.Value;
import haxe.ui.styles.elements.AnimationKeyFrame;
import haxe.ui.styles.elements.AnimationKeyFrames;
import haxe.ui.styles.elements.Directive;

@:access(haxe.ui.core.Component)
class AnimationUtil {
    public static function shake(c:Component, onComplete:Void->Void = null) {
        var k1 = new AnimationKeyFrame();
        k1.time = Value.VDimension(Dimension.PERCENT(0));
        var directive = new Directive("left", Value.VDimension(Dimension.PX(c.left)));
        k1.directives = [directive];

        var k2 = new AnimationKeyFrame();
        k2.time = Value.VDimension(Dimension.PERCENT(20));
        var directive = new Directive("left", Value.VDimension(Dimension.PX(c.left - 5)));
        k2.directives = [directive];
        
        var k3 = new AnimationKeyFrame();
        k3.time = Value.VDimension(Dimension.PERCENT(40));
        var directive = new Directive("left", Value.VDimension(Dimension.PX(c.left + 5)));
        k3.directives = [directive];
        
        var k4 = new AnimationKeyFrame();
        k4.time = Value.VDimension(Dimension.PERCENT(60));
        var directive = new Directive("left", Value.VDimension(Dimension.PX(c.left - 3)));
        k4.directives = [directive];
        
        var k5 = new AnimationKeyFrame();
        k5.time = Value.VDimension(Dimension.PERCENT(80));
        var directive = new Directive("left", Value.VDimension(Dimension.PX(c.left + 3)));
        k5.directives = [directive];

        var k6 = new AnimationKeyFrame();
        k6.time = Value.VDimension(Dimension.PERCENT(100));
        var directive = new Directive("left", Value.VDimension(Dimension.PX(c.left)));
        k6.directives = [directive];
        
        var framesArray:Array<AnimationKeyFrame> = [k1, k2, k3, k4, k5, k6];
        
        var frames = new AnimationKeyFrames("shake", framesArray);
        c.applyAnimationKeyFrame(frames, {
            duration: .1
        });
        c.onAnimationEnd = function(e) {
            c._componentAnimation = null;
            if (onComplete != null) {
                onComplete();
            }
        }
    }
}