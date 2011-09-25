/*!
* Aloha Editor
* Author & Copyright (c) 2010 Gentics Software GmbH
* aloha-sales@gentics.com
* Licensed unter the terms of http://www.aloha-editor.com/license.html
*/

/**
 * @name block
 * @namespace Block plugin
 */
define([
	'aloha/plugin',
	'aloha/floatingmenu',
	//  'i18n!save/nls/i18n',
	'i18n!aloha/nls/i18n',
	'block/blockmanager',
	'block/sidebarattributeeditor',
	'css!save/css/save.css'
], function(Plugin, FloatingMenu, i18n, i18nCore, SidebarAttributeEditor, EditorManager) {
	"use strict";

	var
		jQuery = window.alohaQuery || window.jQuery, $ = jQuery,
		GENTICS = window.GENTICS,
		Aloha = window.Aloha;

	/**
	 * Register the plugin with unique name
	 */
	var SavePlugin = Plugin.create('save', {
		/**
		 * Configure the available languages
		 */
		languages: ['en'],

		/**
		 * default button configuration
		 */
		config: [ 'savedoc', 'saveblock'],
		
		settings: {},
		dependencies: ['block'],

		init: function () {
			// Prepare
			var me = this;
			
			
			var saveDocButton = new Aloha.ui.Button({
				'iconClass': 'aloha-button-savedoc',
				'size': 'small',
				'onclick': function(element, event) {
					me.saveDoc();
				},
				'tooltip': 'Save Document', // i18n.t('button.savedoc.tooltip')
				'toggle': false
			});
			
			var saveBlockButton = new Aloha.ui.Button({
				'iconClass': 'aloha-button-saveblock',
				'size': 'small',
				'onclick': function(element, event) {
					me.saveBlock();
				},
				'tooltip': 'Save Block', // i18n.t('button.saveblock.tooltip')
				'toggle': false
			});
			
			FloatingMenu.addButton(
				'Aloha.continuoustext',
				saveDocButton,
				'Save',
				1
			);
			
			FloatingMenu.addButton(
				'Aloha.continuoustext',
				saveBlockButton,
				'Save',
				1
			);


			// apply specific configuration if an editable has been activated
			Aloha.bind('aloha-editable-activated',function (e, params) {
				//debugger;
				//me.applyButtonConfig(params.editable.obj);
			});

			Aloha.bind('aloha', function() {
				// When Aloha is fully loaded, we grab instance defaults extracting data- attribs.
				///console.info('should init save settings');
				me._initSaveSettings();
				//if (that.settings['sidebarAttributeEditor'] !== false) {
				//	SidebarAttributeEditor.init();
				//}
			});
		},

		/**
		 * Saves a doc.
		 */
		saveDoc: function() {
		  /* save the main document */
					var e = Aloha.getEditableById('content');
					
					alert(e.getContents());
			console.info(this);
			console.info('save doc');
		},

		/**
		 * Saves a block. should be disabled unless in a block
		 */
		saveBlock: function(block) {
		  /* get the block by id */
					var e = Aloha.getEditableById(block);
					alert(e.getContents());
			var saveUrl = this.settings.config.saveblock.url;
			console.info(this);
			console.info('save block');
		},
		_initSaveSettings: function() {
			var defaultSaveSettings;

			if (!this.settings.defaults) {
				this.settings.defaults = {};
			}
			console.info(this.settings);
			$.each(this.settings.defaults, function(selector, instanceDefaults) {
			console.info(selector);
			console.info(instanceDefaults);
				$(selector).alohaSaveSetup(instanceDefaults);
			});
		}
	});

	/**
	 * See (http://jquery.com/).
	 * @name jQuery
	 * @class
	 * See the jQuery Library  (http://jquery.com/) for full details.  This just
	 * documents the function and classes that are added to jQuery by this plug-in.
	 */

	/**
	 * See (http://jquery.com/).
	 * @name jQuery.fn
	 * @class
	 * See the jQuery Library  (http://jquery.com/) for full details.  This just
	 * documents the function and classes that are added to jQuery by this plug-in.
	 */

	/**
	 * Create Aloha blocks from the matched elements
	 * @api
	 * @param {Object} instanceDefaults
	 */
	jQuery.fn.alohaSaveSetup = function(instanceDefaults) {
	  console.info('alohaSaveSetup called');
		instanceDefaults = instanceDefaults || {};
		$(this).each(function(index, element) {
		  // element, instanceDefaults
		  console.info($(this).attr('data-saveurl'));
		  console.info($(this).attr('id'));
		  console.info(element);
		  console.info(instanceDefaults);
		});

		// Chain
		return jQuery(this);
	};

	// $.fn.mahaloBlock = TODO
	return SavePlugin;
});