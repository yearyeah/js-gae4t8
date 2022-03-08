var basePopUrl = window.top.isProd
  ? window.top.location.hostname.indexOf('daili') > -1
    ? 'https://dailiapi.jushuitan.com'
    : 'https://api.erp321.com'
  : 'https://dev-api.jushuitan.com';
JSTPost({
  url: basePopUrl + '/erp/webapi/JGD/JGDPlatformInformationOperate/IsPay',
  data: JSON.stringify({
    coid: $.cookie('u_co_id') || '0',
    uid: $.cookie('u_id') || '0',
    data: {},
  }),
  success: function (res) {
    console.log('success', res);
  },
  error: function (err) {
    console.log(err);
    _this._init(options);
  },
  contentType: 'application/json;charset=utf-8',
});

JSTPost({
  url: '/erp/webapi/JGD/JGDPlatformInformationOperate/IsPay',
  isNeedBaseUrl: true,
  data: JSON.stringify({
    coid: $.cookie('u_co_id') || '0',
    uid: $.cookie('u_id') || '0',
    data: {},
  }),
  success: function (res) {
    console.log('success', res);
  },
  error: function (err) {
    console.log(err);
    _this._init(options);
  },
  contentType: 'application/json;charset=utf-8',
});
