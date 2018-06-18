package project;

interface IProjectListener {
    public function projectResourceAdded(resource:Resource):Void;
    public function activeResourceChanged(resource:Resource):Void;
    public function projectRefreshed():Void;
}
