(function() {
	var Dom = YAHOO.util.Dom, Event = YAHOO.util.Event,

	debug = function() {
		if ((typeof(console) != "undefined") && (typeof(console.debug) == "function")) {
			;;; console.debug.apply(console, arguments);
		}
	},

	createNoteDialog = function(el) {
		var id = el.id;
		try {
			if (Dom.get(id+"-dialog") && Dom.get(id+"-content") && Dom.get(id+"-handle")) {
				var dialog = new YAHOO.widget.Dialog(id+"-dialog", {
					visible: false,
					draggable: false,
					close: !false,
					underlay: "none",
					hideaftersubmit: false
				}),

				containerId = id,

				toggleNote = function(evt, forceShow) {
					var target = evt && Event.getTarget(evt),
						title = null;
					if (!forceShow && dialog.cfg.getProperty("visible")) {
						dialog.hide();
						// title = translate("label_edit_note");
						// Dom.replaceClass(id, "expanded", "collapsed");
					} else {
						dialog.show();
						// title = translate("label_hide_note");
						// Dom.replaceClass(id, "collapsed", "expanded");
					}
					// if (target) {
					// 	if (Dom.getFirstChild(target)) {
					// 		Dom.getFirstChild(target).innerHTML = title;
					// 	} else {
					// 		target.innerHTML = title;
					// 	}
					// 	target.title = title;
					// }
				},

				handleCancel = function() {
					dialog.restoreValue();
					dialog.setStatus("");
				},

				handleSave = function() {
					// get value from RTE
					if (this.editor) {
						this.editor.saveHTML();
					}
					this.setStatus(translate("msg_saving_"));
					this.submit();
				},

				deleteNoteConfirmDialog = null,

				getDeleteNoteConfirmDialog = function(text, buttons) {
					if (!deleteNoteConfirmDialog) {
						deleteNoteConfirmDialog = new YAHOO.widget.SimpleDialog(containerId+"-deleteNoteConfirmDialog", {
							width: "300px",
							// context: [ containerId, "tl", "tl" ],
							// fixedcenter: true,
							visible: false,
							draggable: false,
							close: !true,
							icon: YAHOO.widget.SimpleDialog.ICON_WARN,
							constraintoviewport: true,
							text: translate("msg_confirm_delete_note"),
							buttons: [
								{ text: translate("label_yes"), handler: handleDeleteYes },
								{ text: translate("label_no"), handler: handleDeleteNo }
							]
						});
						deleteNoteConfirmDialog.setHeader(translate("header_confirm_delete_note")),
						deleteNoteConfirmDialog.render(document.body);

						// ;;; debug("deleteNoteConfirmDialog.showEvent", deleteNoteConfirmDialog.showEvent);
						deleteNoteConfirmDialog.showEvent.subscribe(function() {
							var containerRegion = Dom.getRegion(containerId),
								dialogRegion = Dom.getRegion(this.element);
							;;; debug("deleteNoteConfirmDialog.show", containerRegion, dialogRegion);
							this.cfg.setProperty("xy", [
								containerRegion.left+(containerRegion.width-dialogRegion.width)/2,
								containerRegion.top+(containerRegion.height-dialogRegion.height)/4
							]);
						});
					}
					return deleteNoteConfirmDialog;
				},

				handleDeleteYes = function() {
					var confirmDialog = getDeleteNoteConfirmDialog();
					if (confirmDialog) {
						confirmDialog.hide();
						dialog.setValue("");
						dialog.setStatus(translate("msg_deleting_"));
						dialog.submit();
						dialog.hide();
					}
				},

				handleDeleteNo = function() {
					var confirmDialog = getDeleteNoteConfirmDialog();
					if (confirmDialog) {
						confirmDialog.hide();
					}
				},

				handleDelete = function() {
					var confirmDialog = getDeleteNoteConfirmDialog();
					confirmDialog.show();
				},

				onSuccess = function(o) {
					;;; debug("onSuccess", o);
					var response;
					try {
						if (o.responseText) {
							response = YAHOO.lang.JSON.parse(o.responseText);
						}
					} catch (ex) {}
					if (response && (response.status == "SAVE_OK")) {
						dialog.setStatus(translate("msg_note_saved_sucessfully"));
						dialog.storeValue();
					} else {
						dialog.setStatus(translate("msg_error_saving"));
					}
				},
				onFailure = function(o) {
					;;; debug("onFailure", o);
					dialog.setStatus(translate("msg_error_saving"));
				}
				;
				try {
					var buttons = [
						{ text: translate("label_delete_note"), handler: handleDelete },
						{ text: translate("label_cancel"), handler: handleCancel },
						{ text: translate("label_save_note"), handler: handleSave }
					];
					dialog.callback.success = onSuccess;
					dialog.callback.failure = onFailure;
					dialog.cfg.queueProperty("buttons", buttons);

					dialog.setStatus = function(status) {
						// ;;; debug("setStatus", this);

						if (!this.statusEl) {
							this.statusEl = this.footer.ownerDocument.createElement("span");
							Dom.addClass(this.statusEl, "status");
							this.footer.insertBefore(this.statusEl, this.footer.firstChild);
						}
						this.statusEl.innerHTML = status;

						var data = dialog.getData();
						// ....
						if (data.content && data.content.replace(/\s+/, '')) {
							Dom.addClass(id, "non-empty");
						} else {
							Dom.removeClass(id, "non-empty");
						}

						var title;
						if (this.cfg.getProperty("visible")) {
							title = translate("label_hide_note");
							Dom.replaceClass(id, "collapsed", "expanded");
						} else {
							title = translate(Dom.hasClass(id, "non-empty") ? "label_edit_note" : "label_create_note");
							Dom.replaceClass(id, "expanded", "collapsed");
						}

						if (this.toggleHandle) {
							if (Dom.getFirstChild(this.toggleHandle)) {
								Dom.getFirstChild(this.toggleHandle).innerHTML = title;
							} else {
								this.toggleHandle.innerHTML = title;
							}
							this.toggleHandle.title = title;
						}

						// ;;; debug("dialog.data", data);
					}

					dialog.storeValue = function() {
						this.lastSavedValue = Dom.get(id+"-content").value;
					}

					dialog.restoreValue = function() {
						this.setValue(this.lastSavedValue);
					}

					dialog.setValue = function(value) {
						Dom.get(id+"-content").value = value;
						if (this.editor) {
							this.editor.setEditorHTML(value);
						}
					}

					dialog.hideEvent.subscribe(function() {
						// ;;; debug("hideEvent", this);
						this.setStatus("");
					});

					dialog.showEvent.subscribe(function() {
						// ;;; debug("showEvent", this);
						this.setStatus("");
					});

					if (false)
						if (YAHOO.widget.SimpleEditor) {
							dialog.editor = new YAHOO.widget.SimpleEditor(id+"-content", {
								ptags: true,
								toolbar: {
									// titlebar: "Content note",
									buttons: [
										{ group: 'textstyle',
											// label: 'Font Style',
											buttons: [
												{ type: 'push', label: 'Bold', value: 'bold' },
												{ type: 'push', label: 'Italic', value: 'italic' }
											]
										},
										{ type: 'separator' },
										{ group: 'indentlist',
											// label: 'Lists',
											buttons: [
												{ type: 'push', label: 'Create an Unordered List', value: 'insertunorderedlist' },
												{ type: 'push', label: 'Create an Ordered List', value: 'insertorderedlist' }
											]
										},
										{ type: 'separator' },
										{ group: 'insertitem',
											// label: '',
											buttons: [
												{ type: 'push', label: 'HTML Link CTRL + SHIFT + L', value: 'createlink', disabled: true }
												// { type: 'push', label: 'Insert Image', value: 'insertimage' }
											]
										}
									]
								}
							});
							dialog.editor.render();
						}

					dialog.storeValue();

					dialog.render();
					// ;;; debug("dialog.element", dialog.element);

					Dom.setStyle(id+"-dialog", "display", "block");

					// dialog.showEvent.subscribe(function() { ;;; debug("showEvent"); });

					dialog.toggleHandle = Dom.get(id+"-handle");

					Event.on(dialog.toggleHandle, "click", toggleNote);

					if (Dom.hasClass(id, "current")) {
						toggleNote(null, true);
					}

					dialog.setStatus("");
				} catch (ex) {
					;;; debug(ex);
				}
			}
		} catch (ex) {
			;;; debug(ex);
		}
	},

	createNoteMessage = function(el) {
		var id = el.id;
		try {
			if (Dom.get(id+"-message") && Dom.get(id+"-handle")) {
				var
				toggleMessage = function(evt, forceShow) {
					if (forceShow || Dom.hasClass(id, "collapsed")) {
						Dom.replaceClass(id, "collapsed", "expanded");
					} else {
						Dom.replaceClass(id, "expanded", "collapsed");
					}
				}

				toggleMessage();

				Event.on(id+"-handle", "click", toggleMessage);
			}
		} catch (ex) {
			;;; debug(ex);
		}
	},

	initialize = function() {
		var noteElements = Dom.getElementsByClassName("systime-contentnote", "div", document.body, function(el) {
				var id = el.id;
				if (id) {
					if (Dom.get(id+"-dialog")) {
						createNoteDialog(el);
					} else {
						// User (probably) not logged in
						createNoteMessage(el);
					}
				}
			});
	}

	var translate = function(value) {
		var LANG = YAHOO.systime.contentnotes.config.LANG,
			result = (LANG && LANG[value]) ? LANG[value] : value;
		return result;
	}

	YAHOO.namespace("systime.contentnotes");

	YAHOO.systime.contentnotes.config = {};

	YAHOO.systime.contentnotes.applyConfig = function(config) {
		YAHOO.systime.contentnotes.config = config;
		if (!YAHOO.systime.contentnotes.config.LANG) {
			YAHOO.systime.contentnotes.config.LANG = {};
		}
		// ;;; debug("YAHOO.systime.contentnotes.config", YAHOO.systime.contentnotes.config);
	}

	YAHOO.util.Event.onDOMReady(initialize);
}());
