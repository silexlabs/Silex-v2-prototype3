goog.provide('silex.view.Workspace');

goog.require('goog.dom.ViewportSizeMonitor');

var silex = silex || {}; 
silex.view = silex.view || {}; 

//////////////////////////////////////////////////////////////////
// Workspace class
//////////////////////////////////////////////////////////////////
/**
 * the Silex workspace class
 * @constructor
 */
silex.view.Workspace = function(element, menu, stage, pageTool, propertiesTool, textEditor, fileExplorer){
	this.element = element;
	this.menu = menu;
	this.stage = stage;
	this.pageTool = pageTool;
	this.propertiesTool = propertiesTool;
	this.textEditor = textEditor;
	this.fileExplorer = fileExplorer;
	
	this.viewport = new goog.dom.ViewportSizeMonitor();

	var that = this;
	goog.events.listen(this.viewport, goog.events.EventType.RESIZE, function(e){
		that.redraw();
	});
}
/**
 * closure goog.dom.ViewportSizeMonitor object
 */
silex.view.Workspace.prototype.viewport;
/**
 * reference to the silex.view.Menu class
 */
silex.view.Workspace.prototype.menu;
/**
 * reference to the silex.view.Stage class
 */
silex.view.Workspace.prototype.stage;
/**
 * reference to the silex.view.PageTool class
 */
silex.view.Workspace.prototype.pageTool;
/**
 * reference to the silex.view.PropertiesTool class
 */
silex.view.Workspace.prototype.propertiesTool;
/**
 * reference to the silex.view.TextEditor class
 */
silex.view.Workspace.prototype.textEditor;
/**
 * reference to the silex.view.FileExplorer class
 */
silex.view.Workspace.prototype.fileExplorer;
/**
 * reference to the attached element
 */
silex.view.Workspace.prototype.element;
/**
 * redraw the workspace, positions and sizes of the tool boxes
 */
silex.view.Workspace.prototype.redraw = function(){
	var that = this;
	setTimeout(function() { that.doRedraw(); }, 400);
}
silex.view.Workspace.prototype.doRedraw = function(){
	var viewportSize = this.viewport.getSize();
	var pageToolSize = goog.style.getSize(this.pageTool.element);
	var propertiesToolSize = goog.style.getSize(this.propertiesTool.element);
	var menuSize = goog.style.getSize(this.menu.element);

	// stage
	var stageWidth = viewportSize.width - pageToolSize.width - propertiesToolSize.width;
	goog.style.setWidth(this.stage.element, stageWidth);

	// menu offset
	var toolsHeight = viewportSize.height - menuSize.height;
	goog.style.setHeight(this.pageTool.element, toolsHeight);
	goog.style.setHeight(this.propertiesTool.element, toolsHeight);
	goog.style.setHeight(this.stage.element, toolsHeight);

	// texteditor
	if (this.textEditor.element){
		var textEditorSize = goog.style.getSize(this.textEditor.element);
		var posX = (viewportSize.width - textEditorSize.width)/2;
		var posY = (viewportSize.height - textEditorSize.height)/2;
		goog.style.setPosition(this.textEditor.element, posX, posY);
	}
	// fileExplorer
	if (this.fileExplorer.element){
		var fileExplorerSize = goog.style.getSize(this.fileExplorer.element);
		var posX = (viewportSize.width - fileExplorerSize.width)/2;
		var posY = (viewportSize.height - fileExplorerSize.height)/2;
		goog.style.setPosition(this.fileExplorer.element, posX, posY);
	}
}