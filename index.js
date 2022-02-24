// Import stylesheets
import './style.css';
import $ from 'jquery';

import freeToScm from './snippet/freeToScm';

//window.domain = 'jushuitan.com';

freeToScm.init();

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

// setInterval(function () {
//   var url = `https://www.erp321.com/app/order/order/OrderEditor.aspx?order_id=149383&archive=false&owner_co_id=10000052&fromList=true&editorArg=undefined&_dialog=true&_t=1645433033259&_dialog_id=id1645433033248`;
//   var orderInfo = $(
//     `<iframe id="home" tagname="home" frameborder="no"></iframe>`
//   );
//   $('body').append(
//     orderInfo
//       .css({
//         width: '100%',
//         height: '500px',
//         position:"fixed",
//         let:"0",
//         top:"0"
//       })
//       .prop('src', url)
//   );
//   setTimeout(function () {
//     orderInfo.remove();
//   }, 4000);
// }, 50000);

var _Dialog = new (function () {
  this.dialogList = [];
  this.beginIndex = 61;
  this.Current = function () {
    if (this.dialogList.length == 0) {
      return null;
    }
    return this.dialogList[this.dialogList.length - 1];
  };
  this.Find = function (dialogid) {
    if (this.dialogList.length == 0) {
      return null;
    }
    for (var i = 0; i < this.dialogList.length; i++) {
      var d = this.dialogList[i];
      if (d.id == dialogid) {
        d._find_index = i;
        return d;
      }
    }

    return null;
  };

  this.Remove = function (dialog) {
    if (dialog) {
      var findIndex = d._find_index;
      this.dialogList.removeAt(findIndex);
    }
  };

  this.Table = function (className, rowCount, cellCount) {
    var dialogTable = $("<table class='" + className + "'></table>");
    dialogTable.rows = [];
    dialogTable.cells = [];
    if (!rowCount) {
      rowCount = 1;
    }
    if (!cellCount) {
      cellCount = 1;
    }
    for (var i = 0; i < rowCount; i++) {
      var dialogRow = $('<tr></tr>').appendTo(dialogTable);
      dialogTable.rows.push(dialogRow);
      for (var j = 0; j < cellCount; j++) {
        var dialogCell = $("<td class='" + className + "'></td>").appendTo(
          dialogRow
        );
        dialogTable.cells.push(dialogCell);
      }
    }

    return dialogTable;
  };

  this.ZIndex = function (zIndex) {
    for (var i = 0; i < this.dialogList.length; i++) {
      this.dialogList[i].dialog_ctrl.css('z-index', this.beginIndex + i + 1);
    }
  };

  this.Show = function (arg) {
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
    var dialogPanel = $(
      "<div class='_dialog_panel _float_box'></div>"
    ).appendTo(dialogAlign);

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
  this.BuildTool = function (tool, isLast, arg) {
    var toolCtrl = $('<span></span>').text(tool.text);
    tool.ctrl = toolCtrl;
    if (tool.id) {
      toolCtrl.attr('id', tool.id);
    }
    if (tool.class) {
      toolCtrl.addClass(tool.class);
    } else {
      toolCtrl.addClass('_dialog_tool');
      if (!(toolCtrl.hasClass('tool_blue') || toolCtrl.hasClass('tool_line'))) {
        if (isLast) {
          toolCtrl.addClass('_dialog_tool tool_blue');
        } else {
          toolCtrl.addClass('_dialog_tool tool_line');
        }
      }
    }
    if (tool.css) {
      toolCtrl.css(tool.css);
    }
    if (tool.title) {
      toolCtrl.attr('title', tool.title);
    }
    if (tool.click) {
      toolCtrl.click(tool.click);
    } else if (tool.onclick) {
      var onclick = tool.onclick;
      if (arg && arg.frame) {
        onclick =
          "document.getElementById('" +
          arg.frame.attr('id') +
          "').contentWindow." +
          onclick;
      }
      toolCtrl.attr('onclick', onclick);
    }

    return toolCtrl;
  };
  this.CreateToolbar = function (arg) {
    var bar = $("<div class='_dialog_toolbar'></div>");
    if (arg.toolbar.css) {
      bar.css(arg.toolbar.css);
    }
    if (arg.toolbar.ctrl) {
      bar.append(arg.toolbar.ctrl);
    } else if (arg.toolbar.html) {
      bar.html(arg.toolbar.html);
    } else if (arg.toolbar.tools) {
      for (var i = 0; i < arg.toolbar.tools.length; i++) {
        var tool = arg.toolbar.tools[i];
        if (!tool) {
          continue;
        }
        if (tool.ctrl) {
          tool.ctrl.appendTo(bar);
          continue;
        }
        this.BuildTool(tool, i == arg.toolbar.tools.length - 1, arg).appendTo(
          bar
        );
      }
    }

    if (typeof arg.toolbar.created != 'undefined') {
      arg.toolbar.created(bar);
    }
    return bar;
  };
  this.WritePosition = function (arg) {
    if (typeof arg.refer != 'undefined') {
      var p = arg.panel.position();
      $.cookieKeyValue('dkv', 'pst' + arg.refer, p.left + ',' + p.top);
    }
  };
  this.ShowDialogIndex = function () {
    for (var i = this.dialogList.length - 1; i >= 0; i--) {
      var d = this.dialogList[i];
      if (d.dialog && d.dialog_ctrl.is(':visible')) {
        return parseInt(d.dialog_ctrl.css('z-index')) - this.beginIndex;
      }
    }

    return 0;
  };

  this.Close = function (arg, rv) {
    if (arg && arg.auto_position) {
      this.WritePosition(arg);
    }
    if (typeof arg.close != 'undefined' && arg.close != null) {
      var isClose = arg.close(rv);
      if (isClose === false) {
        return;
      }
    }
    if (arg.close_type == 'close') {
      arg.dialog_ctrl.remove();
      arg.dialog_ctrl = null;
      arg.dialog = false;
      this.dialogList.remove(arg);

      this.Cover(this.ShowDialogIndex());
    } else {
      arg.dialog = false;
      arg.dialog_ctrl.hide();

      this.Cover(this.ShowDialogIndex());
    }
  };

  this.Cover = function (zIndex) {
    var dc = $('#_dialog_cover').show();

    if (zIndex == 0) {
      dc.hide();
      return;
    }
    if (dc.length == 0) {
      dc = $("<div id='_dialog_cover' class='_opacity'></div>").appendTo(
        $(document.body)
      );
    }
    dc.css('z-index', this.beginIndex + zIndex);
  };
})();
