let webSocketData = {
  subwayDays: [],
  itemsDays: [],
}


// 连接socket服务
let webSocket = new WebSocket(wsUrl)
sokcet()

function sokcet() {
  // 开启连接
  webSocket.onopen = function () {
    console.log('webSocket open')
    let data = {
      runAsShopName: globalData.subwayTokenData.runAsShopTitle ? globalData.subwayTokenData.runAsShopTitle : null,
      runAsShopId: globalData.subwayTokenData.runAsShopId ? globalData.subwayTokenData.runAsShopId : null,
      token: globalData.token
    }
    console.log(data)
    webSocket.send(JSON.stringify(data))
  }
  // 关闭连接
  webSocket.onclose = function () {
    console.log('webSocket close')
    setTimeout(() => {
      window.webSocket = new WebSocket(wsUrl)
      sokcet()
      let data = {
        runAsShopName: globalData.subwayTokenData.runAsShopTitle,
        runAsShopId: globalData.subwayTokenData.runAsShopId,
        token: globalData.token
      }
      console.log(data)
      webSocket.send(JSON.stringify(data))
    }, 3000)
  }
  // 拿到返回
  webSocket.onmessage = function (e) {
    let d = JSON.parse(e.data)
    console.log(d)
    // 显示桌面通知
    if (d.type == 'msg') {
      chrome.notifications.create(null, {
        type: 'basic',
        iconUrl: 'images/logo48x48.png',
        title: d.head,
        message: d.content,
      })
    } else if (d.shopId == globalData.subwayTokenData.runAsShopId) {
      // 词根雷达初始化
      if (d.type == 'getInit') {
        var today = (new Date()).getTime()
        var yesterday = new Date(today - 24 * 60 * 60 * 1000 - 9 * 60 * 60 * 1000)
        itemsEffect.endDate = `${yesterday.getFullYear()}-${addZero(yesterday.getMonth() + 1)}-${addZero(yesterday.getDate())}`
        var before30Day = new Date(today - 24 * 60 * 60 * 1000 * 30 - 9 * 60 * 60 * 1000)
        itemsEffect.startDate = `${before30Day.getFullYear()}-${addZero(before30Day.getMonth() + 1)}-${addZero(before30Day.getDate())}`
        var m = []
        yesterday = yesterday.getTime()
        before30Day = before30Day.getTime()
        for (var i = yesterday; i >= before30Day; i -= 24 * 60 * 60 * 1000) {
          var theDay = new Date(i)
          m.push(`${theDay.getFullYear()}-${addZero(theDay.getMonth() + 1)}-${addZero(theDay.getDate())}`)
        }
        subway.arr = subway.arr.concat(m)
        getAndPostItemsEffect(2000)
        getAndPostSubwayData(1000)
        let data = {
          runAsShopName: globalData.subwayTokenData.runAsShopTitle,
          runAsShopId: globalData.subwayTokenData.runAsShopId,
          token: globalData.token,
          type: 'init',
          code: 200,
          data: null
        }
        console.log(data)
        webSocket.send(JSON.stringify(data))
      }
      // 获取单品分析数据
      else if (d.type == 'getItem') {
        var startTime = (new Date(d.startTime)).getTime()
        var endTime = (new Date(d.endTime)).getTime()
        var m = []
        for (var i = endTime; i >= startTime; i -= 24 * 60 * 60 * 1000) {
          var theDay = new Date(i)
          var obj = {
            itemId: d.itemId,
            queryTime: `${theDay.getFullYear()}-${addZero(theDay.getMonth() + 1)}-${addZero(theDay.getDate())}`
          }
          m.push(obj)
        }
        itemsFrom.arr = itemsFrom.arr.concat(m)
        keyword.arr = keyword.arr.concat(m)
        getAndPostItemsFrom()
        getAndPostItemsFromKeyword(450)
      }
      // 修复30天单品数据
      else if (d.type == 'getRepair') {
        var startTime = (new Date(d.startTime)).getTime()
        var endTime = (new Date(d.endTime)).getTime()
        let itemMap = new Map(webSocketData.itemsDays)
        let subwaySet = new Set(webSocketData.subwayDays)
        for (var i = endTime; i >= startTime; i -= 24 * 60 * 60 * 1000) {
          var theDay = new Date(i)
          theDay = `${theDay.getFullYear()}-${addZero(theDay.getMonth() + 1)}-${addZero(theDay.getDate())}`
          if (!subwaySet.has(theDay)) {
            webSocketData.subwayDays.push(theDay)
            subway.arr.push(theDay)
            getAndPostSubwayData(1000)
          }
        }
        if (itemMap.has(d.itemId)) {
          var days = itemMap.get(d.itemId)
          let daySet = new Set(days)
          for (var i = endTime; i >= startTime; i -= 24 * 60 * 60 * 1000) {
            var theDay = new Date(i)
            theDay = `${theDay.getFullYear()}-${addZero(theDay.getMonth() + 1)}-${addZero(theDay.getDate())}`
            if (!daySet.has(theDay)) {
              days.push(theDay)
              var obj = {
                itemId: d.itemId,
                queryTime: theDay
              }
              itemsFrom.arr.push(obj)
              keyword.arr.push(obj)
              getAndPostItemsFrom()
              getAndPostItemsFromKeyword(450)
            }
          }
        } else {
          let arr = []
          arr.push(d.itemId)
          var days = []
          for (var i = endTime; i >= startTime; i -= 24 * 60 * 60 * 1000) {
            var theDay = new Date(i)
            theDay = `${theDay.getFullYear()}-${addZero(theDay.getMonth() + 1)}-${addZero(theDay.getDate())}`
            days.push(theDay)
            var obj = {
              itemId: d.itemId,
              queryTime: theDay
            }
            itemsFrom.arr.push(obj)
            keyword.arr.push(obj)
            getAndPostItemsFrom()
            getAndPostItemsFromKeyword(450)
          }
          arr.push(days)
          webSocketData.itemsDays.push(arr)
        }
        findItemById(d.itemId, 2000)
        console.log(webSocketData.itemsDays)
        console.log(webSocketData.subwayDays)
      }
      // // 单品数据补空
      // else if(d.type == "getRepairPart"){
      //     var itemMap = new Map(webSocketData.itemsDays);
      //     var subwaySet = new Set(webSocketData.subwayDays);
      //     if(!subwaySet.has(d.startTime)){
      //         webSocketData.subwayDays.push(d.startTime);
      //         subway.arr.push(d.startTime);
      //         getAndPostSubwayData(1000);
      //     }
      //     if(itemMap.has(d.itemId)){
      //         var days = itemMap.get(d.itemId);
      //         var daySet = new Set(days);
      //         if(!daySet.has(d.startTime)){
      //             days.push(d.startTime);
      //             var obj = {
      //                 itemId:d.itemId,
      //                 queryTime:d.startTime
      //             }
      //             itemsFrom.arr.push(obj);
      //             keyword.arr.push(obj);
      //             getAndPostItemsFrom();
      //             getAndPostItemsFromKeyword(450);
      //         }
      //     }else{
      //         var arr = [];
      //         arr.push(d.itemId);
      //         var days = [];
      //         days.push(d.startTime);
      //         var obj = {
      //             itemId:d.itemId,
      //             queryTime:d.startTime
      //         }
      //         itemsFrom.arr.push(obj);
      //         keyword.arr.push(obj);
      //         getAndPostItemsFrom();
      //         getAndPostItemsFromKeyword(450);
      //         arr.push(days);
      //         webSocketData.itemsDays.push(arr);
      //     }
      //     findItemById(d.itemId,2000);
      //     console.log(webSocketData.itemsDays);
      //     console.log(webSocketData.subwayDays);
      // }

      else if (d.type == 'getPlan') {
        // 获取所有计划
        var t = new Date().getTime()
        $.ajax({
          url: 'https://subway.simba.taobao.com/openapi/param2/1/gateway.subway/common/campaign/list$',
          type: 'post',
          async: true,
          data: {
            token: globalData.subwayToken,
            _h: getHash(t),
            t: t
          },
          success: function(res) {
            if (res.code == '200') {
              try {
                let result = res.result
                let msg = []
                for (let i = 0; i < result.length; i++) {
                  if (result[i].type == '0') {
                    let obj = {
                      campaignId: result[i].id,
                      title: result[i].title,
                      status: result[i].status
                    }
                    msg.push(obj)
                  }
                }
                var data = {
                  runAsShopName: globalData.subwayTokenData.runAsShopTitle,
                  runAsShopId: globalData.subwayTokenData.runAsShopId,
                  token: globalData.token,
                  type: 'plan',
                  code: 200,
                  data: msg
                }
              } catch (err) {
                var data = {
                  runAsShopName: globalData.subwayTokenData.runAsShopTitle,
                  runAsShopId: globalData.subwayTokenData.runAsShopId,
                  token: globalData.token,
                  type: 'plan',
                  code: 200,
                  data: []
                }
              }
            } else {
              var data = {
                runAsShopName: globalData.subwayTokenData.runAsShopTitle,
                runAsShopId: globalData.subwayTokenData.runAsShopId,
                token: globalData.token,
                type: 'plan',
                code: 400
              }
            }
            console.log(data)
            webSocket.send(JSON.stringify(data))
          }
        })
      }
      // 根据计划id获取计划下的所有商品
      else if (d.type == 'getPlanItems') {
        var tpl = 'https://subway.simba.taobao.com/adgroup/spread/list.htm?query={"page":{"pagesize":50000,"pagenum":1},"query":{"campaignId":"{campaignId}","title":""}}'
        var t = new Date().getTime()
        $.ajax({
          url: tpl.replace('{campaignId}', d.campaignId),
          type: 'post',
          async: true,
          data: {
            token: globalData.subwayToken,
            _h: getHash(t),
            t: t
          },
          success: function(res) {
            if (res.code == '200') {
              try {
                let result = res.result.items
                let msg = []
                for (let i = 0; i < result.length; i++) {
                  let obj = {
                    imgUrl: result[i].adGroupDTO.imgUrl,
                    linkUrl: result[i].adGroupDTO.linkUrl,
                    title: result[i].adGroupDTO.title,
                    adGroupId: result[i].adGroupDTO.adGroupId,
                    productId: result[i].adGroupDTO.productId,
                    firstCat: result[i].adGroupDTO.categoryId.split(' ')[0],
                    price: result[i].adGroupDTO.outsideItemPrice
                  }
                  msg.push(obj)
                }
                var data = {
                  runAsShopName: globalData.subwayTokenData.runAsShopTitle,
                  runAsShopId: globalData.subwayTokenData.runAsShopId,
                  token: globalData.token,
                  type: 'planitems',
                  code: 200,
                  data: msg
                }
              } catch (err) {
                var data = {
                  runAsShopName: globalData.subwayTokenData.runAsShopTitle,
                  runAsShopId: globalData.subwayTokenData.runAsShopId,
                  token: globalData.token,
                  type: 'planitems',
                  code: 200,
                  data: []
                }
              }
            } else {
              var data = {
                runAsShopName: globalData.subwayTokenData.runAsShopTitle,
                runAsShopId: globalData.subwayTokenData.runAsShopId,
                token: globalData.token,
                type: 'planitems',
                code: 400
              }
            }
            console.log(data)
            webSocket.send(JSON.stringify(data))
          }
        })
      }
      // 一键创建人群
      else if (d.type == 'getAddCrowd') {
        var taskA = function() {
          return (function() {
            let def = new $.Deferred()
            let t = new Date().getTime()
            $.ajax({
              url: 'https://subway.simba.taobao.com/adgroupTargeting/findAdgroupTargetingList.htm',
              type: 'get',
              async: true,
              data: {
                productId: d.productId,
                bizType: '1',
                adgroupId: d.adGroupId,
                _h: getHash(t),
                t: t
              },
              success: function(res) {
                if (res.code == '200') {
                  try {
                    let result = res.result
                    let crowds = []
                    let ids = []
                    for (let i = 0; i < result.length; i++) {
                      crowds.push(result[i].crowdDTO.id)
                      ids.push(result[i].id)
                    }
                    def.resolve(JSON.stringify(crowds), JSON.stringify(ids))
                  } catch (err) {
                    def.reject()
                  }
                } else {
                  def.reject()
                }
              }
            })
            return def.promise()
          }()).then((crowds, ids) => {
            let def = new $.Deferred
                      var t = new Date().getTime()
                      $.ajax({
              url: 'https://subway.simba.taobao.com/adgroupTargeting/delete.htm',
              type: 'post',
              async: true,
              data: {
                adgroupId: d.adGroupId,
                crowds: crowds,
                productId: d.productId,
                bizType: '1',
                ids: ids,
                token: globalData.subwayToken,
                _h: getHash(t),
                t: t
              },
              success: function(res) {
                if (res.code == '200') {
                  def.resolve()
                              }else {
                  def.reject()
                              }
              }
            })
            return def.promise()
                  })
        }
        var taskB = function() {
          return (function() {
            let def = new $.Deferred()
            let t = new Date().getTime()
            $.ajax({
              url: 'https://subway.simba.taobao.com/crowdTemplate/getLayoutExt.htm',
              type: 'get',
              async: true,
              data: {
                productId: d.productId,
                bizType: '1',
                firstCat: d.firstCat,
                _h: getHash(t),
                t: t
              },
              success: function(res) {
                if (res.code == '200') {
                  try {
                    let tabs = []
                    let one = []
                    let two = []
                    let three = []
                    for (var i of res.result[1].dimDTOs) {
                      if (i.name == '类目笔单价') {
                        one = i.tagOptions
                      } else if (i.name == '性别') {
                        two = i.tagOptions
                      } else if (i.name == '年龄') {
                        three = i.tagOptions
                      }
                    }
                    for (var i = 0; i < one.length; i++) {
                      for (var j = 0; j < two.length; j++) {
                        var a = {
                          dimId: two[j].dimId,
                          tagId: two[j].tagId,
                          tagName: two[j].tagName,
                          optionGroupId: two[j].optionGroupId
                        }
                        var b = {
                          dimId: one[i].dimId,
                          tagId: one[i].tagId,
                          tagName: one[i].tagName,
                          optionGroupId: one[i].optionGroupId
                        }
                        tabs.push([a, b, 110])
                      }
                    }
                    for (var i = 0; i < three.length; i++) {
                      for (var j = 0; j < two.length; j++) {
                        var a = {
                          dimId: two[j].dimId,
                          tagId: two[j].tagId,
                          tagName: two[j].tagName,
                          optionGroupId: two[j].optionGroupId
                        }
                        var b = {
                          dimId: three[i].dimId,
                          tagId: three[i].tagId,
                          tagName: three[i].tagName,
                          optionGroupId: three[i].optionGroupId
                        }
                        tabs.push([a, b, 105])
                      }
                    }
                    def.resolve(tabs)
                  } catch (err) {
                    def.reject()
                  }
                } else {
                  def.reject()
                }
              }
            })
            return def.promise()
          }()).then((tabs) => {
            console.log(tabs)
                      var def = new $.Deferred
                      def.resolve()
                      $.each(tabs, (i,e) => {
                          def = def.then(function(){
                              return delayTime(getBetweenRound(globalData.min,globalData.max));
                          }).then(function(){
                              var _d = new $.Deferred;
                              var t = new Date().getTime();
                              $.ajax({
                                  url : 'https://subway.simba.taobao.com/adgroupTargeting/add.htm',
                                  type : "post",
                                  async : true,
                                  data : {
                                      adgroupId : d.adGroupId,
                                      bizType : '1',
                                      productId : d.productId,
                                      token : globalData.subwayToken,
                                      targetings : '[{"crowdDTO":{"extParam":{"firstCat":"'+ d.firstCat +'"},"templateId":12,"name":"' + e[0].tagName + '+' + e[1].tagName + '","tagList":['+ JSON.stringify(e[0]) +','+ JSON.stringify(e[1]) +']},"isDefaultPrice":0,"priceMode":1,"discount":' + e[2] + '}]',
                                      _h:getHash(t),
                                      t:t
                                  },
                                  success : function(res){
                                      if(res.code == '200'){
                                          try{
                                              if(e[1].dimId == '100001'){
                                                  ageG.push(res.result[0].id);
                                              }else{
                                                  priceG.push(res.result[0].id);
                                              }
                                              _d.resolve();
                                          }catch(err){
                                              _d.reject();
                                          }
                                      }else{
                                          _d.reject();
                                      }
                                  }
                              })
                              return _d.promise();
                          })
                      })
            return def.promise()
                  })
        }
        let taskC = function() {
          return (function() {
            let def = new $.Deferred()
            let tpl = 'https://subway.simba.taobao.com/crowdTemplate/getLayoutExt.htm?bizType=1&productId={productId}&crowdType=12&adgroupId={adgroupId}'
            let t = new Date().getTime()
            $.ajax({
              url: tpl.replace('{productId}', d.productId).replace('{adgroupId}', d.adGroupId),
              type: 'get',
              async: true,
              data: {
                _h: getHash(t),
                t: t
              },
              success: function(res) {
                if (res.code == '200') {
                  try {
                    let result
                    for (var i = 0; i < res.result.length; i++) {
                      if (res.result[i].id == '28') {
                        for (let j = 0; j < res.result[i].dimDTOs.length; j++) {
                          if (res.result[i].dimDTOs[j].id == '100012') {
                            result = res.result[i].dimDTOs[j].tagOptions
                          }
                          break
                        }
                        break
                      }
                    }
                    let args = []
                    for (var i = 0; i < result.length; i++) {
                      let obj = {
                        crowdDTO: {
                          templateId: '28',
                          name: result[i].tagName,
                          tagList: [
                            {
                              dimId: result[i].dimId,
                              tagId: result[i].tagId,
                              tagName: result[i].tagName,
                              optionGroupId: result[i].optionGroupId,
                            }
                          ],
                        },
                        isDefaultPrice: 0,
                        discount: 115
                      }
                      args.push(obj)
                    }
                    def.resolve(JSON.stringify(args))
                  } catch (err) {
                    def.reject()
                  }
                } else {
                  def.reject()
                }
              }
            })
            return def.promise()
          }()).then((args) => {
            let def = new $.Deferred
                      var t = new Date().getTime()
                      $.ajax({
              url: 'https://subway.simba.taobao.com/adgroupTargeting/addBatch.htm',
              type: 'post',
              async: true,
              data: {
                productId: d.productId,
                bizType: '1',
                adgroupId: d.adGroupId,
                targetings: args,
                adgroupIdList: `["${  d.adGroupId  }"]`,
                token: globalData.subwayToken,
                _h: getHash(t),
                t: t
              },
              success: function(res) {
                if (res.code == '200') {
                  try {
                    let result = res.result
                                      for (let i = 0; i < result.length; i++) {
                      relationG.push((result[i].id).toString())
                                      }
                    def.resolve()
                                  } catch(err) {
                    def.reject()
                                  }
                }else {
                  def.reject()
                              }
              }
            })
            return def.promise()
                  })
        }
        var relationG = []
        var priceG = []
        var ageG = []
        taskA().then(() => {
          $.when(taskB(), taskC()).then(() => {
                      var data = {
                          runAsShopName : globalData.subwayTokenData.runAsShopTitle,
                          runAsShopId : globalData.subwayTokenData.runAsShopId,
                          token : globalData.token,
                          type : "addcrowd",
                          code : 200,
                          data : {
                              relationG : relationG,
                              priceG : priceG,
                              ageG : ageG
                          }
                      }
                      console.log(data);
                      webSocket.send(JSON.stringify(data));
                  }, () => {
                      var data = {
                          runAsShopName : globalData.subwayTokenData.runAsShopTitle,
                          runAsShopId : globalData.subwayTokenData.runAsShopId,
                          token : globalData.token,
                          type : "addcrowd",
                          code : 400
                      }
                      console.log(data);
                      webSocket.send(JSON.stringify(data));
                  })
        }, () => {
          let data = {
            runAsShopName: globalData.subwayTokenData.runAsShopTitle,
            runAsShopId: globalData.subwayTokenData.runAsShopId,
            token: globalData.token,
            type: 'addcrowd',
            code: 400
          }
          console.log(data)
                  webSocket.send(JSON.stringify(data))
              })
      }
      // 根据商品id获取所有人群
      else if (d.type == 'getCrowdList') {
        var taskA = function() {
          let def = new $.Deferred()
          let t = new Date().getTime()
          $.ajax({
            url: 'https://subway.simba.taobao.com/adgroupTargeting/findAdgroupTargetingList.htm',
            type: 'get',
            async: true,
            data: {
              productId: d.productId,
              bizType: '1',
              adgroupId: d.adGroupId,
              _h: getHash(t),
              t: t
            },
            success: function(res) {
              if (res.code == '200') {
                try {
                  let result = res.result
                  for (let i = 0; i < result.length; i++) {
                    let obj = {
                      crowdId: result[i].id,
                      dtoId: result[i].crowdDTO.id,
                      name: result[i].crowdDTO.name,
                      onlineStatus: result[i].crowdDTO.onlineState,
                      discount: result[i].discount == '0' ? '100' : result[i].discount
                    }
                    targetingList.push(obj)
                  }
                } catch (err) {
                  targetingList = []
                }
                def.resolve()
              } else {
                def.reject()
              }
            }
          })
          return def.promise()
        }
        var taskB = function() {
          let def = new $.Deferred()
          let today = new Date()
          today = `${today.getFullYear()}-${addZero(today.getMonth() + 1)}-${addZero(today.getDate())}`
          if (d.startDate == today) {
            var tpl = 'https://subway.simba.taobao.com/rtreport/rptBpp4pCrowdRealtimeSubwayList.htm?campaignid={campaignid}&adgroupid={adgroupid}&theDate={theDate}&traffictype={traffictype}'
            tpl = tpl.replace('{campaignid}', d.campaignId).replace('{adgroupid}', d.adGroupId).replace('{theDate}', d.startDate).replace('{traffictype}', d.trafficType)
          } else {
            var tpl = 'https://subway.simba.taobao.com/report/rptBpp4pCrowdSubwayList.htm?campaignid={campaignid}&adgroupid={adgroupid}&startDate={startDate}&endDate={endDate}&traffictype={traffictype}'
            if (d.endDate == today && d.endDate != d.startDate) {
              let yesterday = new Date(new Date() - 1000 * 60 * 60 * 24)
              yesterday = `${yesterday.getFullYear()}-${addZero(yesterday.getMonth() + 1)}-${addZero(yesterday.getDate())}`
              console.log(yesterday)
              tpl = tpl.replace('{campaignid}', d.campaignId).replace('{adgroupid}', d.adGroupId).replace('{startDate}', d.startDate).replace('{endDate}', yesterday)
                .replace('{traffictype}', d.trafficType)
            } else {
              tpl = tpl.replace('{campaignid}', d.campaignId).replace('{adgroupid}', d.adGroupId).replace('{startDate}', d.startDate).replace('{endDate}', d.endDate)
                .replace('{traffictype}', d.trafficType)
            }
          }
          let t = new Date().getTime()
          $.ajax({
            url: tpl,
            type: 'post',
            async: true,
            data: {
              token: globalData.subwayToken,
              _h: getHash(t),
              t: t
            },
            success: function(res) {
              if (res.code == '200') {
                try {
                  let result = res.result
                  for (let i = 0; i < result.length; i++) {
                    let obj = {
                      impression: result[i].impression,
                      click: result[i].click,
                      cost: result[i].cost,
                      roi: result[i].roi,
                      cpm: result[i].cpm,
                      cpc: result[i].cpc,
                      coverage: result[i].coverage,
                      ctr: result[i].ctr,
                      directcarttotal: result[i].directcarttotal,
                      indirectcarttotal: result[i].indirectcarttotal,
                      carttotal: result[i].carttotal,
                      favitemtotal: result[i].favitemtotal,
                      favshoptotal: result[i].favshoptotal,
                      favtotal: result[i].favtotal,
                      directtransactionshipping: result[i].directtransactionshipping,
                      indirecttransactionshipping: result[i].indirecttransactionshipping,
                      transactionshippingtotal: result[i].transactionshippingtotal,
                      indirecttransaction: result[i].indirecttransaction,
                      directtransaction: result[i].directtransaction,
                      transactiontotal: result[i].transactiontotal,
                      dtoId: result[i].crowdid
                    }
                    subwayList.push(obj)
                  }
                } catch (err) {
                  subwayList = []
                }
                def.resolve()
              } else {
                def.reject()
              }
            }
          })
          return def.promise()
        }
        var targetingList = []
        var subwayList = []
        $.when(taskA(), taskB()).then(() => {
          let data = {
            runAsShopName: globalData.subwayTokenData.runAsShopTitle,
            runAsShopId: globalData.subwayTokenData.runAsShopId,
            token: globalData.token,
            type: 'crowdlist',
            code: 200,
            data: {
              targetingList: targetingList,
              subwayList: subwayList
            }
          }
          console.log(data)
                  webSocket.send(JSON.stringify(data))
              }, () => {
          let data = {
            runAsShopName: globalData.subwayTokenData.runAsShopTitle,
            runAsShopId: globalData.subwayTokenData.runAsShopId,
            token: globalData.token,
            type: 'crowdlist',
            code: 400
          }
          console.log(data)
                  webSocket.send(JSON.stringify(data))
              })
      }
      // 获取分子分母
      else if (d.type == 'getScore') {
        var taskA = function() {
          let def = new $.Deferred()
          let today = new Date()
          today = `${today.getFullYear()}-${addZero(today.getMonth() + 1)}-${addZero(today.getDate())}`
          if (d.startDate == today) {
            var tpl = 'https://subway.simba.taobao.com/rtreport/rptBpp4pCrowdRealtimeTotal.htm?campaignid={campaignid}&adgroupid={adgroupid}&theDate={theDate}&traffictype={traffictype}'
            tpl = tpl.replace('{campaignid}', d.campaignId).replace('{adgroupid}', d.adGroupId).replace('{theDate}', d.startDate).replace('{traffictype}', d.trafficType)
          } else {
            var tpl = 'https://subway.simba.taobao.com/report/rptBpp4pCrowdSubwayTotal.htm?campaignid={campaignid}&adgroupid={adgroupid}&startDate={startDate}&endDate={endDate}&traffictype={traffictype}'
            if (d.endDate == today && d.endDate != d.startDate) {
              let yesterday = new Date(new Date() - 1000 * 60 * 60 * 24)
              yesterday = `${yesterday.getFullYear()}-${addZero(yesterday.getMonth() + 1)}-${addZero(yesterday.getDate())}`
              console.log(yesterday)
              tpl = tpl.replace('{campaignid}', d.campaignId).replace('{adgroupid}', d.adGroupId).replace('{startDate}', d.startDate).replace('{endDate}', yesterday)
                .replace('{traffictype}', d.trafficType)
            } else {
              tpl = tpl.replace('{campaignid}', d.campaignId).replace('{adgroupid}', d.adGroupId).replace('{startDate}', d.startDate).replace('{endDate}', d.endDate)
                .replace('{traffictype}', d.trafficType)
            }
          }
          let t = new Date().getTime()
          $.ajax({
            url: tpl,
            type: 'post',
            async: true,
            data: {
              token: globalData.subwayToken,
              _h: getHash(t),
              t: t
            },
            success: function(res) {
              if (res.code == '200') {
                try {
                  numerator = res.result.impression ? res.result.impression : '0'
                } catch (err) {
                  numerator = '0'
                }
                def.resolve()
              } else {
                def.reject()
              }
            }
          })
          return def.promise()
        }
        var taskB = function() {
          return (function() {
            let def = new $.Deferred()
            let tpl = 'https://subway.simba.taobao.com/creative/list.htm?adGroupId={adGroupId}&productId={productId}'
            let t = new Date().getTime()
            $.ajax({
              url: tpl.replace('{adGroupId}', d.adGroupId).replace('{productId}', d.productId),
              type: 'post',
              async: true,
              data: {
                token: globalData.subwayToken,
                _h: getHash(t),
                t: t
              },
              success: function(res) {
                if (res.code == '200') {
                  let result = res.result
                  let custid = ''
                  let ids = []
                  try {
                    custid = result[0].customerId
                    for (let i = 0; i < result.length; i++) {
                      ids.push(result[i].creativeId)
                    }
                    def.resolve(custid, ids.toString())
                  } catch (err) {
                    def.reject()
                  }
                } else {
                  def.reject()
                }
              }
            })
            return def.promise()
          }()).then((custid, ids) => {
            if (custid != '' || ids != '') {
              let def = new $.Deferred
                          var today = new Date()
                          today = `${today.getFullYear()}-${addZero(today.getMonth()+1)}-${addZero(today.getDate())}`;
              if (d.startDate == today) {
                var tpl = 'https://subway.simba.taobao.com/report/commondList.htm?templateId=rptBpp4pCreativeRealtimeSubwayListTotal&thedate={thedate}&ids={ids}&campaignid={campaignid}&adgroupid={adgroupid}&custid={custid}&traffictype={traffictype}&mechanism=0'
                              tpl = tpl.replace('{thedate}', d.startDate).replace('{ids}', ids).replace('{campaignid}', d.campaignId).replace('{adgroupid}', d.adGroupId)
.replace('{custid}', custid)
.replace('{traffictype}', d.trafficType)
                          } else{
                var tpl = 'https://subway.simba.taobao.com/report/commondList.htm?templateId=rptBpp4pCreativeSubwayListTotal&isshop=0&campaignid={campaignid}&startDate={startDate}&endDate={endDate}&ids={ids}&network={network}&searchtype=0'
                              if (d.endDate == today && d.endDate != d.startDate) {
                  let yesterday = new Date(new Date() - 1000 * 60 * 60 * 24)
                                  yesterday = `${yesterday.getFullYear()}-${addZero(yesterday.getMonth()+1)}-${addZero(yesterday.getDate())}`;
                  console.log(yesterday)
                                  tpl = tpl.replace('{campaignid}', d.campaignId).replace('{startDate}', d.startDate).replace('{endDate}', yesterday).replace('{ids}', ids)
.replace('{network}', d.trafficType)
                              } else{
                  tpl = tpl.replace('{campaignid}', d.campaignId).replace('{startDate}', d.startDate).replace('{endDate}', d.endDate).replace('{ids}', ids)
.replace('{network}', d.trafficType)
                              }
              }
              let t = new Date().getTime()
                          $.ajax({
                url: tpl,
                type: 'post',
                async: true,
                data: {
                  token: globalData.subwayToken,
                  _h: getHash(t),
                  t: t
                },
                success: function(res) {
                  if (res.code == '200') {
                    try {
                      denominator = res.result[0].impression ? res.result[0].impression:'0'
                                      } catch(err) {
                      denominator = '0'
                                      }
                    def.resolve()
                                  } else{
                    def.reject()
                                  }
                }
              })
              return def.promise()
                      }
          })
        }
        var numerator = '0'
        var denominator = '0'
        $.when(taskA(), taskB()).then(() => {
          let data = {
            runAsShopName: globalData.subwayTokenData.runAsShopTitle,
            runAsShopId: globalData.subwayTokenData.runAsShopId,
            token: globalData.token,
            type: 'score',
            code: 200,
            data: {
              numerator: numerator,
              denominator: denominator
            }
          }
          console.log(data)
                  webSocket.send(JSON.stringify(data))
              }, () => {
          let data = {
            runAsShopName: globalData.subwayTokenData.runAsShopTitle,
            runAsShopId: globalData.subwayTokenData.runAsShopId,
            token: globalData.token,
            type: 'score',
            code: 400
          }
          console.log(data)
                  webSocket.send(JSON.stringify(data))
              })
      }
      // 修改溢价
      else if (d.type == 'getUpdatePrice') {
        var taskA = function() {
          let def = new $.Deferred()
          let t = new Date().getTime()
          $.ajax({
            url: 'https://subway.simba.taobao.com/adgroupTargeting/findAdgroupTargetingList.htm',
            type: 'get',
            async: true,
            data: {
              productId: d.productId,
              bizType: '1',
              adgroupId: d.adGroupId,
              _h: getHash(t),
              t: t
            },
            success: function(res) {
              if (res.code == '200') {
                let targetingList = []
                try {
                  targetingList = res.result
                } catch (err) {
                  targetingList = []
                }
                def.resolve(targetingList)
              } else {
                def.reject()
              }
            }
          })
          return def.promise()
        }
        taskA().then((targetingList) => {
          let crowdIds = d.crowdIds.split(',')
          let targetings = []
          try {
            for (let i = 0; i < crowdIds.length; i++) {
              for (let j = 0; j < targetingList.length; j++) {
                if (crowdIds[i] == targetingList[j].id) {
                  let obj = {
                    adgroupId: `${d.adGroupId}`,
                    crowdDTO: {
                      id: targetingList[j].crowdDTO.id
                    },
                    id: crowdIds[i],
                    isDefaultPrice: 0,
                    discount: d.discount
                  }
                  targetings.push(obj)
                  break
                }
              }
            }
          } catch (error) {

          }
          let t = new Date().getTime()
          $.ajax({
            url: 'https://subway.simba.taobao.com/adgroupTargeting/update.htm',
            type: 'post',
            async: true,
            data: {
              productId: d.productId,
              bizType: '1',
              targetings: JSON.stringify(targetings),
              token: globalData.subwayToken,
              _h: getHash(t),
              t: t
            },
            success: function(res) {
              if (res.code == '200') {
                var data = {
                  runAsShopName: globalData.subwayTokenData.runAsShopTitle,
                  runAsShopId: globalData.subwayTokenData.runAsShopId,
                  token: globalData.token,
                  type: 'updateprice',
                  code: 200,
                  data: res.result
                }
              } else {
                var data = {
                  runAsShopName: globalData.subwayTokenData.runAsShopTitle,
                  runAsShopId: globalData.subwayTokenData.runAsShopId,
                  token: globalData.token,
                  type: 'updateprice',
                  code: 400
                }
              }
              webSocket.send(JSON.stringify(data))
            }
          })
        })
      }
      // 修改人群名称
      else if (d.type == 'getUpdateCrowdName') {
        var taskA = function() {
          let def = new $.Deferred()
          let t = new Date().getTime()
          $.ajax({
            url: 'https://subway.simba.taobao.com/adgroupTargeting/findAdgroupTargetingList.htm',
            type: 'get',
            async: true,
            data: {
              productId: d.productId,
              bizType: '1',
              adgroupId: d.adGroupId,
              _h: getHash(t),
              t: t
            },
            success: function(res) {
              if (res.code == '200') {
                let targetingList = []
                try {
                  targetingList = res.result
                } catch (err) {
                  targetingList = []
                }
                def.resolve(targetingList)
              } else {
                def.reject()
              }
            }
          })
          return def.promise()
        }
        taskA().then((targetingList) => {
          let crowdDTO = {
            adgroupId: d.adGroupId,
            name: d.name,
            id: d.crowdIds,
            productId: d.productId
          }
          try {
            for (let i = 0; i < targetingList.length; i++) {
              if (targetingList[i].id == d.crowdIds) {
                crowdDTO.id = targetingList[i].crowdDTO.id
                break
              }
            }
          } catch (error) {

          }
          let t = new Date().getTime()
          $.ajax({
            url: 'https://subway.simba.taobao.com/crowd/update.htm',
            type: 'post',
            async: true,
            data: {
              crowdDTO: JSON.stringify(crowdDTO),
              token: globalData.subwayToken,
              _h: getHash(t),
              t: t
            },
            success: function(res) {
              if (res.code == '200') {
                var data = {
                  runAsShopName: globalData.subwayTokenData.runAsShopTitle,
                  runAsShopId: globalData.subwayTokenData.runAsShopId,
                  token: globalData.token,
                  type: 'updatecrowdname',
                  code: 200,
                  data: res.result
                }
              } else {
                var data = {
                  runAsShopName: globalData.subwayTokenData.runAsShopTitle,
                  runAsShopId: globalData.subwayTokenData.runAsShopId,
                  token: globalData.token,
                  type: 'updatecrowdname',
                  code: 400
                }
              }
              webSocket.send(JSON.stringify(data))
            }
          })
        })
      }
      // 删除人群
      else if (d.type == 'getDeleteCrowds') {
        var taskA = function() {
          let def = new $.Deferred()
          let t = new Date().getTime()
          $.ajax({
            url: 'https://subway.simba.taobao.com/adgroupTargeting/findAdgroupTargetingList.htm',
            type: 'get',
            async: true,
            data: {
              productId: d.productId,
              bizType: '1',
              adgroupId: d.adGroupId,
              _h: getHash(t),
              t: t
            },
            success: function(res) {
              if (res.code == '200') {
                let targetingList = []
                try {
                  targetingList = res.result
                } catch (err) {
                  targetingList = []
                }
                def.resolve(targetingList)
              } else {
                def.reject()
              }
            }
          })
          return def.promise()
        }
        taskA().then((targetingList) => {
          try {
            var ids = d.crowdIds.split(',')
            var crowds = []
            for (let i = 0; i < ids.length; i++) {
              for (let j = 0; j < targetingList.length; j++) {
                if (ids[i] == targetingList[j].id) {
                  crowds.push(targetingList[j].crowdDTO.id)
                  break
                }
              }
            }
          } catch (error) {

          }
          let t = new Date().getTime()
          $.ajax({
            url: 'https://subway.simba.taobao.com/adgroupTargeting/delete.htm',
            type: 'post',
            async: true,
            data: {
              adgroupId: d.adGroupId,
              crowds: JSON.stringify(crowds),
              productId: d.productId,
              bizType: '1',
              ids: JSON.stringify(ids),
              token: globalData.subwayToken,
              _h: getHash(t),
              t: t
            },
            success: function(res) {
              if (res.code == '200') {
                var data = {
                  runAsShopName: globalData.subwayTokenData.runAsShopTitle,
                  runAsShopId: globalData.subwayTokenData.runAsShopId,
                  token: globalData.token,
                  type: 'deletecrowds',
                  code: 200,
                  data: res.result
                }
              } else {
                var data = {
                  runAsShopName: globalData.subwayTokenData.runAsShopTitle,
                  runAsShopId: globalData.subwayTokenData.runAsShopId,
                  token: globalData.token,
                  type: 'deletecrowds',
                  code: 400
                }
              }
              webSocket.send(JSON.stringify(data))
            }
          })
        })
      }
      // 人群暂停或参与推广
      else if (d.type == 'getUpdateStatus') {
        var taskA = function() {
          let def = new $.Deferred()
          let t = new Date().getTime()
          $.ajax({
            url: 'https://subway.simba.taobao.com/adgroupTargeting/findAdgroupTargetingList.htm',
            type: 'get',
            async: true,
            data: {
              productId: d.productId,
              bizType: '1',
              adgroupId: d.adGroupId,
              _h: getHash(t),
              t: t
            },
            success: function(res) {
              if (res.code == '200') {
                let targetingList = []
                try {
                  targetingList = res.result
                } catch (err) {
                  targetingList = []
                }
                def.resolve(targetingList)
              } else {
                def.reject()
              }
            }
          })
          return def.promise()
        }
        taskA().then((targetingList) => {
          let crowdIds = d.crowdIds.split(',')
          let targetings = []
          try {
            for (let i = 0; i < crowdIds.length; i++) {
              for (let j = 0; j < targetingList.length; j++) {
                if (crowdIds[i] == targetingList[j].id) {
                  let obj = {
                    adgroupId: `${d.adGroupId}`,
                    crowdDTO: {
                      id: targetingList[j].crowdDTO.id
                    },
                    id: crowdIds[i],
                    onlineStatus: d.onlineStatus
                  }
                  targetings.push(obj)
                  break
                }
              }
            }
          } catch (error) {

          }
          let t = new Date().getTime()
          $.ajax({
            url: 'https://subway.simba.taobao.com/adgroupTargeting/update.htm',
            type: 'post',
            async: true,
            data: {
              productId: d.productId,
              bizType: '1',
              targetings: JSON.stringify(targetings),
              token: globalData.subwayToken,
              _h: getHash(t),
              t: t
            },
            success: function(res) {
              if (res.code == '200') {
                var data = {
                  runAsShopName: globalData.subwayTokenData.runAsShopTitle,
                  runAsShopId: globalData.subwayTokenData.runAsShopId,
                  token: globalData.token,
                  type: 'updatestatus',
                  code: 200,
                  data: res.result
                }
              } else {
                var data = {
                  runAsShopName: globalData.subwayTokenData.runAsShopTitle,
                  runAsShopId: globalData.subwayTokenData.runAsShopId,
                  token: globalData.token,
                  type: 'updatestatus',
                  code: 400
                }
              }
              webSocket.send(JSON.stringify(data))
            }
          })
        })
      }
      // 获取今天的创意信息
      else if (d.type == 'getTodayCreative') {
        (function() {
          let def = new $.Deferred()
          let tpl = 'https://subway.simba.taobao.com/creative/list.htm?adGroupId={adGroupId}&productId={productId}'
          let t = new Date().getTime()
          $.ajax({
            url: tpl.replace('{adGroupId}', d.adGroupId).replace('{productId}', d.productId),
            type: 'post',
            async: true,
            data: {
              token: globalData.subwayToken,
              _h: getHash(t),
              t: t
            },
            success: function(res) {
              if (res.code == '200') {
                let result = res.result
                let custid = ''
                let ids = []
                try {
                  custid = result[0].customerId
                  for (let i = 0; i < result.length; i++) {
                    ids.push(result[i].creativeId)
                  }
                  def.resolve(custid, ids.toString())
                } catch (err) {
                  def.reject()
                }
              } else {
                def.reject()
              }
            }
          })
          return def.promise()
        }()).then((custid, ids) => {
          let today = new Date()
                  today = `${today.getFullYear()}-${addZero(today.getMonth()+1)}-${addZero(today.getDate())}`;
          let tpl = 'https://subway.simba.taobao.com/report/commondList.htm?templateId=rptBpp4pCreativeRealtimeSubwayListTotal&thedate={thedate}&ids={ids}&campaignid={campaignid}&adgroupid={adgroupid}&custid={custid}&traffictype={traffictype}&mechanism=0'
                  tpl = tpl.replace('{thedate}', today).replace('{ids}', ids).replace('{campaignid}', d.campaignId).replace('{adgroupid}', d.adGroupId)
.replace('{custid}', custid)
.replace('{traffictype}', d.trafficType)
                  var t = new Date().getTime()
                  $.ajax({
            url: tpl,
            type: 'post',
            async: true,
            data: {
              token: globalData.subwayToken,
              _h: getHash(t),
              t: t
            },
            success: function(res) {
              if (res.code == '200') {
                let result = res.result
                              try {
                  var obj = {
                    impression: result[0].impression ? result[0].impression:'0',
                    click: result[0].click ? result[0].click:'0',
                    ctr: result[0].ctr ? result[0].ctr:'0',
                    cost: result[0].cost ? result[0].cost:'0',
                    cpc: result[0].cpc ? result[0].cpc:'0',
                    favtotal: result[0].favtotal ? result[0].favtotal:'0',
                    indirectcarttotal: result[0].indirectcarttotal ? result[0].indirectcarttotal:'0',
                    favitemtotal: result[0].favitemtotal ? result[0].favitemtotal:'0',
                    roi: result[0].roi ? result[0].roi:'0',
                    coverage: result[0].coverage ? result[0].coverage:'0',
                    cpm: result[0].cpm ? result[0].cpm:'0',
                    indirecttransaction: result[0].indirecttransaction ? result[0].indirecttransaction:'0',
                    transactiontotal: result[0].transactiontotal ? result[0].transactiontotal:'0',
                    indirecttransactionshipping: result[0].indirecttransactionshipping ? result[0].indirecttransactionshipping:'0',
                    favshoptotal: result[0].favshoptotal ? result[0].favshoptotal:'0',
                    directcarttotal: result[0].directcarttotal ? result[0].directcarttotal:'0',
                    directtransactionshipping: result[0].directtransactionshipping ? result[0].directtransactionshipping:'0',
                    transactionshippingtotal: result[0].transactionshippingtotal ? result[0].transactionshippingtotal:'0',
                    carttotal: result[0].carttotal ? result[0].carttotal:'0',
                    directtransaction: result[0].directtransaction ? result[0].directtransaction:'0'
                  }
                }catch (err) {
                  var obj = {
                    impression: '0',
                    click: '0',
                    ctr: '0',
                    cost: '0',
                    cpc: '0',
                    favtotal: '0',
                    indirectcarttotal: '0',
                    favitemtotal: '0',
                    roi: '0',
                    coverage: '0',
                    cpm: '0',
                    indirecttransaction: '0',
                    transactiontotal: '0',
                    indirecttransactionshipping: '0',
                    favshoptotal: '0',
                    directcarttotal: '0',
                    directtransactionshipping: '0',
                    transactionshippingtotal: '0',
                    carttotal: '0',
                    directtransaction: '0'
                  }
                }
                var data = {
                  runAsShopName: globalData.subwayTokenData.runAsShopTitle,
                  runAsShopId: globalData.subwayTokenData.runAsShopId,
                  token: globalData.token,
                  type: 'todaycreative',
                  code: 200,
                  data: obj
                }
              } else{
                var data = {
                  runAsShopName: globalData.subwayTokenData.runAsShopTitle,
                  runAsShopId: globalData.subwayTokenData.runAsShopId,
                  token: globalData.token,
                  type: 'todaycreative',
                  code: 400
                }
              }
              console.log(data)
                          webSocket.send(JSON.stringify(data))
                      }
          })
        }, () => {
          let data = {
            runAsShopName: globalData.subwayTokenData.runAsShopTitle,
            runAsShopId: globalData.subwayTokenData.runAsShopId,
            token: globalData.token,
            type: 'todaycreative',
            code: 400
          }
          console.log(data)
                  webSocket.send(JSON.stringify(data))
              })
      }
      // 获取今天之前的创意信息
      else if (d.type == 'getBeforeCreative') {
        var tpl = 'https://subway.simba.taobao.com/creative/list.htm?adGroupId={adGroupId}&productId={productId}'
        var t = new Date().getTime()
        $.ajax({
          url: tpl.replace('{adGroupId}', d.adGroupId).replace('{productId}', d.productId),
          type: 'post',
          async: true,
          data: {
            token: globalData.subwayToken,
            _h: getHash(t),
            t: t
          },
          success: function(res) {
            if (res.code == '200') {
              let result = res.result
              var ids = []
              try {
                var data = {
                  runAsShopName: globalData.subwayTokenData.runAsShopTitle,
                  runAsShopId: globalData.subwayTokenData.runAsShopId,
                  token: globalData.token,
                  type: 'beforecreative',
                  code: 200,
                  data: null
                }
                webSocket.send(JSON.stringify(data))
                for (var i = 0; i < result.length; i++) {
                  ids.push(result[i].creativeId)
                }
                var ids = ids.toString()
                let startTime = (new Date(d.startDate)).getTime()
                let endTime = (new Date(d.endDate)).getTime()
                let arr = []
                for (var i = endTime; i >= startTime; i -= 24 * 60 * 60 * 1000) {
                  let theDay = new Date(i)
                  theDay = `${theDay.getFullYear()}-${addZero(theDay.getMonth() + 1)}-${addZero(theDay.getDate())}`
                  let obj = {
                    day: theDay,
                    ids: ids,
                    campaignId: d.campaignId,
                    adGroupId: d.adGroupId,
                    network: d.trafficType
                  }
                  arr.push(obj)
                }
                creative.arr = creative.arr.concat(arr)
                getAndPostCreative()
              } catch (err) {
                var data = {
                  runAsShopName: globalData.subwayTokenData.runAsShopTitle,
                  runAsShopId: globalData.subwayTokenData.runAsShopId,
                  token: globalData.token,
                  type: 'beforecreative',
                  code: 400
                }
                webSocket.send(JSON.stringify(data))
              }
            } else {
              var data = {
                runAsShopName: globalData.subwayTokenData.runAsShopTitle,
                runAsShopId: globalData.subwayTokenData.runAsShopId,
                token: globalData.token,
                type: 'beforecreative',
                code: 400
              }
              webSocket.send(JSON.stringify(data))
            }
          }
        })
      } else if (d.type == 'getCartCnt') {
        var today = (new Date()).getTime()
        var yesterday = new Date(today - 24 * 60 * 60 * 1000 - 9 * 60 * 60 * 1000)
        yesterday = `${yesterday.getFullYear()}-${addZero(yesterday.getMonth() + 1)}-${addZero(yesterday.getDate())}`
        var before30Day = new Date(today - 24 * 60 * 60 * 1000 * 30 - 9 * 60 * 60 * 1000)
        before30Day = `${before30Day.getFullYear()}-${addZero(before30Day.getMonth() + 1)}-${addZero(before30Day.getDate())}`
        var tpl = `https://sycm.taobao.com/flow/v3/new/item/source/detail.json?dateRange={startDate}%7C{endDate}&dateType=recent30&pageSize=20&page={page}&order=desc&orderBy=uv&itemId={itemId}&device={device}&pageId=3.1&pPageId=3&pageLevel=2&childPageType=se_keyword&belong=all&indexCode=uv%2CcartByrCnt&token={token}&_=${new Date().getTime()}`
        var taskA = function(page) {
          let def = new $.Deferred()
          setTimeout(() => {
            $.ajax({
              url: tpl.replace('{startDate}', before30Day).replace('{endDate}', yesterday).replace('{page}', page).replace('{itemId}', d.adGroupId)
                .replace('{device}', d.trafficType)
                .replace('{token}', globalData.sycmToken),
              type: 'get',
              success: function(res) {
                if (res.code == 0) {
                  def.resolve(res.data)
                } else {
                  let data = {
                    runAsShopName: globalData.subwayTokenData.runAsShopTitle,
                    runAsShopId: globalData.subwayTokenData.runAsShopId,
                    token: globalData.token,
                    type: 'cartcnt',
                    code: 400
                  }
                  webSocket.send(JSON.stringify(data))
                  def.reject()
                }
              }
            })
          }, getBetweenRound(globalData.min, globalData.max))
          return def.promise()
        }
        var taskB = function(totalPage, page = 1) {
          if (totalPage > 0) {
            taskA(page).then((data) => {
              data = data.data
              for (let v of data) {
                dataList.push({
                  pageName: v.pageName.value,
                  cartByrCnt: v.cartByrCnt.value,
                  uv: v.uv.value
                })
              }
              totalPage--
              page++
              taskB(totalPage, page)
            })
          } else {
            console.log(dataList)
            let data = {
              runAsShopName: globalData.subwayTokenData.runAsShopTitle,
              runAsShopId: globalData.subwayTokenData.runAsShopId,
              token: globalData.token,
              type: 'cartcnt',
              code: 200,
              data: dataList,
            }
            webSocket.send(JSON.stringify(data))
          }
        }
        var dataList = []
        taskA(1).then((data) => {
          let totalPage = data.recordCount / 20
          if (totalPage > 0) {
            taskB(totalPage)
          } else {
            var data = {
              runAsShopName: globalData.subwayTokenData.runAsShopTitle,
              runAsShopId: globalData.subwayTokenData.runAsShopId,
              token: globalData.token,
              type: 'cartcnt',
              code: 200,
              data: []
            }
            webSocket.send(JSON.stringify(data))
          }
        })
      }
    }
  }
}
