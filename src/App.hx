import hxd.System;
import h2d.Console;
import h3d.anim.Skin.Joint;
import SiteProcess;

class App extends dn.Process {
	public static var ME : App;

	public var jDoc : J;
	public var jBody : J;
	public var jSite : J;
	public var jLearning : Learning;

	public function new() {
		super();

		ME = this;
		jDoc = new J( js.Browser.document );
		jBody = new J("body");
		jLearning = new Learning();
		jSite = jBody.find("#site");
		startText();
	}

	override function onDispose() {
		super.onDispose();
		if( ME==this )
			ME = null;
	}

	function startText(){
		var jText = new J('<button id="test-button">Add element!</button>');
		var jButton = new J('<button id="test-button">Check elements!</button>');
		var jType = new J('<input type=file />');
		jType.change(_->{
			notify(_.result);
			trace(jType.html);
		});
		jText.click( _->{
			var name = js.Browser.window.prompt("Enter the name to add!");
			if(name == null)return;
			jLearning.addElement(name);
			notify('Added $name to the learning class!');
		});
		jButton.click(_->{
			jLearning.checkElements();
		});
		jSite.append(jText);
		jSite.append(jButton);
		jSite.append(jType);
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