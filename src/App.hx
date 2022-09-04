import h2d.Console;
import h3d.anim.Skin.Joint;
import SiteProcess;

class App extends dn.Process {
	public static var ME : App;

	public var jDoc : J;
	public var jBody : J;
	public var jSite : J;

	public function new() {
		super();

		ME = this;
		jDoc = new J( js.Browser.document );
		jBody = new J("body");
		jSite = jBody.find("#site");
		jSite.append("New test");
		jSite.append("New test again!");
		notify("test!");
		startText();
	}

	override function onDispose() {
		super.onDispose();
		if( ME==this )
			ME = null;
	}

	function startText(){
		var jText = new J('<div id="text"/>');
		jText.click( _->{
			trace('test');
		});
		jSite.append(jText);
		jText.text('text');
	}
	/**
		Show a quick text notification that fades out automatically
	**/
	function notify(str:String) {
		jBody.find("#notif").remove();
		var jNotif = new J('<div id="notif"/>');
		jBody.prepend(jNotif);
		jNotif.text(str);
		jNotif.stop(true).hide().slideDown(200).delay(1400).fadeOut(200);
	}
}