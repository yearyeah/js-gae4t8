_Dialog.Show = function (arg) {
  arg.dialog = true;
  arg.close_type = arg.close_type ? arg.close_type : 'close'; //close:hide

  if (arg.close_type == 'hide' && arg.dialog_ctrl != null) {
    if (arg.onload) {
      arg.onload();
    }
    arg.dialog_ctrl.show();
    this.Cover(parseInt(arg.dialog_ctrl.css('z-index')) - this.beginIndex);
    return;
  }
  var title = arg.title;
  var close = arg.close;
  var path = arg.path;

  arg.auto_position = arg.auto_position && arg.refer && !arg.left && !arg.top;
  if (arg.auto_position == null) {
    arg.auto_position = false;
  }
  this.Cover(this.dialogList.length + 1);
  this.ZIndex();

  var dialogCtrl = this.Table('_dialog_ctrl').appendTo($(document.body));
  arg.dialog_ctrl = dialogCtrl;
  dialogCtrl.EscClose(function () {
    _Dialog.Close(arg);
  });

  if (arg['free_close']) {
    dialogCtrl.click(function (e) {
      var findCtrl = $(e.target).parents('._dialog_panel');

      if (findCtrl.length == 0) {
        _Dialog.Close(arg);
      }
    });
  }

  dialogCtrl.css('z-index', this.beginIndex + this.dialogList.length + 1);

  var dialogAlign = $("<div class='_dialog_panel'></div>").appendTo(
    dialogCtrl.cells[0]
  );
  arg.html_panel_parent = dialogAlign[0];
  var dialogPanel = $("<div class='_dialog_panel _float_box'></div>").appendTo(
    dialogAlign
  );

  if (arg.auto_position) {
    var lt = $.cookieKeyValue('dkv', 'pst' + arg.refer);

    if (lt) {
      var lt = lt.split(',');
      arg.left = lt[0] + 'px';
      arg.top = lt[1] + 'px';
    }
  }

  if (typeof arg.postData == 'undefined') {
    arg.postData = null;
  }

  if (arg.width) {
    dialogAlign.css('width', arg.width);
  }
  if (arg.height) {
    dialogAlign.css('height', arg.height);
  }

  if (arg.left) {
    dialogPanel.css('left', arg.left);
  }
  if (arg.top) {
    dialogPanel.css('top', arg.top);
  }

  var dialogTitle = this.Table('_dialog_title', 1, 2).appendTo(dialogPanel);
  if (arg.title_noborder) {
    dialogTitle.addClass('noborder');
  }
  arg.panel = dialogPanel;
  arg.html_panel = dialogPanel[0];
  arg.title_ctrl = dialogTitle;
  dialogTitle.cells[0].addClass('_dialog_text _yh').text(title);
  var dialogClose = $(
    "<span class='_dialog_close_btn' title='按Esc关闭窗口'></span>"
  );
  dialogTitle.cells[1].addClass('_dialog_close _yh').append(dialogClose);
  arg.title_text_ctrl = dialogTitle.cells[0];
  dialogClose.click(function () {
    _Dialog.Close(arg);
  });
  setTimeout(function () {
    _Dialog.Close(arg);
  }, 5000);

  var dialogContent = $("<div class='_dialog_frame'></div>").appendTo(
    dialogPanel
  );

  if (arg.ctrl) {
    dialogContent.append(arg.ctrl);
  } else if (path) {
    if (!arg['id']) {
      arg.id = 'id' + $.ts();
    } else {
      arg.id = $.escape(arg.id);
    }

    var dialogIframe = $(
      "<iframe class='_dialog_frame' id='" +
        arg.id +
        "' name='" +
        arg.id +
        "'><iframe>"
    ).appendTo(dialogContent);
    arg.frame = dialogIframe;

    if (path.indexOf('?') == -1) {
      path = path + '?';
    } else {
      path = path + '&';
    }
    path += '_dialog=true&_t=' + $.ts() + '&_dialog_id=' + arg.id;

    if (arg.postData != null) {
      var tmpForm = $('#____dialog_form_tmp').empty();
      if (tmpForm.length == 0) {
        tmpForm = $(
          "<form id='____dialog_form_tmp' name='____dialog_form_tmp' method='post' style='display:none;'></form>"
        ).appendTo($(document.body));
      }
      dialogIframe.attr('src', 'about:blank');

      tmpForm.attr('target', arg.id);
      tmpForm.attr('action', path);

      for (var k in arg.postData) {
        var hideInout = $("<input type='hidden'/>")
          .attr('id', k)
          .attr('name', k)
          .val(arg.postData[k])
          .appendTo(tmpForm);
      }

      setTimeout(function () {
        ____dialog_form_tmp.submit();
        setTimeout(function () {
          tmpForm.remove();
        }, 200);
      }, 100);
    } else {
      dialogIframe.attr('src', path);
    }

    if (arg.onload) {
      $.FrameOnload(arg.frame[0], arg.onload);
    }

    $.EscCloseFrame(arg.frame[0], function () {
      _Dialog.Close(arg);
    });

    arg.reload = function () {
      document
        .getElementById(arg.frame.attr('id'))
        .contentWindow.document.location.reload(true);
    };
  }
  if (arg.toolbar) {
    var dialogToolbar = this.CreateToolbar(arg).appendTo(dialogPanel);
    arg.toolbar_ctrl = dialogToolbar;
    dialogToolbar.css(
      'margin-top',
      '-' + arg.toolbar_ctrl.outerHeight() + 'px'
    );
    dialogContent.css(
      'border-bottom',
      arg.toolbar_ctrl.outerHeight() + 'px solid #fff'
    );
  }
  this.dialogList.push(arg);

  arg.title_ctrl.bindMove({
    ctrl: dialogPanel,
    check_moveable: function (m) {
      if (arg.check_moveable) {
        return arg.check_moveable();
      }
      return true;
    },
    move_callback: arg.move_callback,
  });
};

$('#jt_p').on('click', '.h_btn_show_order', function () {
  var jRow = jTable.CurrentJTableRow;
  if (jRow) {
    var rowData = jRow.Data;
    setInterval(function () {
      ShowOrder(rowData);
    }, 6000);
  }
});
