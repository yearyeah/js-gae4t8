var freeToScm = {
  config: {
    api: '/erp/webapi/UserApi/Company/GetShopTypes',
  },
  init: function () {
    var basePopUrl = window.top.isProd
      ? window.top.location.hostname.indexOf('daili') > -1
        ? 'https://api.jushuitan.com'
        : 'https://api.erp321.com'
      : 'https://dev-api.jushuitan.com';

    //testApiUrl = 'http://mydev.jst.com/webapi/UserApi/Company/GetShopTypes';

    var requestData = {
      coid: '0',
      uid: '0',
      data: {
        coid: '0',
      },
    };

    try {
      requestData.coid = $.cookie('u_co_id');
      requestData.data.coid = $.cookie('u_co_id');
      requestData.uid = $.cookie('u_id');
    } catch (e) {
      window.console && console.error('Error:' + e);
    }

    JSTPost({
      url: basePopUrl + this.config.api,
      //url: testApiUrl,
      data: JSON.stringify(requestData),
      success: function (res) {
        console.log('success', res);
        var platformList = res.data.map((item) => {
          return item.shopType;
        });
        console.log('platformList', platformList);
      },
      contentType: 'application/json;charset=utf-8',
    });
  },
};

export default freeToScm;
