/**
 * Created by huang on 2016/8/17.
 */

/**
 * 初始化拯救列表样式及数据
 */
function initCommentView(examId) {
    var commentHtml = '<div class="div-record-list"><div class="record-title"><hr width="30%" color=#B4B4B4 style="float:left;position: relative" size="1"/>' +
        '<span style="width: 30%">有谁救了TA</span><hr width="30%" color=#B4B4B4  style="position: relative;float:right" size="1"/></div>' +
        '<ul class="records"></ul></div><div class="div-page"><img class="arrow arrowLeft" onclick="recordPrePage();" src="img/left-page.png"/><img class="arrow arrowRight" onclick="recordNextPage()" src="img/right-page.png"/></div>' +
        '<br/><div onclick="recordNextPage()">我还在1号柜摇奖，摇完就救你</div><div>1号柜|出品</div><br/>';
    $('.div-comment-view').html(commentHtml);
    initRecordList(examId);
}

var recordPageNum = 1;
var recordPageSize = 10;

function initRecordList(examId){
    $('.arrowLeft').hide();
    recordPageNum = 1;
    queryExamUser(examId, recordPageNum, recordPageSize, function (result) {
        if(result.length < recordPageSize){
            $('.div-page').hide();
        }
        var dataView = getRecordView(result);
        $('.records').html(dataView);
    });
}

function recordNextPage(){
    recordPageNum ++;
    queryExamUser('', recordPageNum, recordPageSize, function (result) {
        $('.arrowLeft').show();
        if(result.length < recordPageSize){
            $('.arrowRight').hide();
        }
        var dataView = getRecordView(result);
        $('.records').html(dataView);
    });
}

function recordPrePage(){
    if (recordPageNum == 1) {
        $('.arrowLeft').hide();
        return;
    }
    recordPageNum --;
    $('.arrowRight').show();
    queryExamUser('', recordPageNum, recordPageSize, function (result) {
        var dataView = getRecordView(result);
        $('.records').html(dataView);
    });
}

function getRecordView(result){
    var records = [];
    for (var recordIndex = 0; recordIndex < result.length; recordIndex++) {

        var imgUrl = result[recordIndex].img;
        var nickName = result[recordIndex].nickname;
        if (nickName.length > 6)
            nickName = nickName.substring(0, 6);
        var state = result[recordIndex].state;
        var stateHtml = getStateView(state);
        records.push('<li class="item-content"><img class="img-record" src='+imgUrl+'/><span class="name-record">'+nickName+'</span>'+stateHtml+'<hr width="90%" color=#B4B4B4 size="1" />');
    }
    return records.join('');
}

function getStateView(state){
    var stateHtml = '';
    if (state == '-1'){
        stateHtml='<div class="detail-content result-give-up">见死不救</div>';
    } else if (state == '0') {
        stateHtml='<div class="detail-content result-failed">救!死!了!</div>';
    } else if (parseInt(state) >= 3){
        stateHtml='<div class="detail-content result-success">成功解救</div>';
    } else {
        stateHtml='<div class="detail-content result-half">半死不活</div>';
    }
    return stateHtml;
}

function queryExamUser(examId, currentPage, pageSize, callback) {
	callback(data);
}

var data = {
    
}
