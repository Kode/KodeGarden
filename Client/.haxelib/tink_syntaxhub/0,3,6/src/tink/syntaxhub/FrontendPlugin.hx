package tink.syntaxhub;

interface FrontendPlugin {
  function extensions():Iterator<String>;
  function parse(file:String, context:FrontendContext):Void;
}