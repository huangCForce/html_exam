var index = 0;

var appRoot;

$(function () {
	startGame();
    var count = getQueryString('rightAnswerCount');
    if (count){
        showResultView(count);
    }

    if(data.openid == data.loginOpenId){
        window.location.href = 'design.html?isShowShareView=1&examId='+getQueryString('examId');
    }

    $(".css-slider-wrapper").swipe(
        {
            swipe: function (event, direction, distance, duration, fingerCount) {//事件，方向，距离（像素为单位），时间，手指数量
                if (direction == "down") {
                    if (index <= 0) return;
                    $('.slider').css('-webkit-transform', 'translateY(-' + ((index - 1) * 100) + '%)');
                    index--;
                    if (index == 0) {
                        index_one_anim();
                        remove_two_anim();
                    } else if (index==1){
                        index_two_anim();
                        remove_three_anim();
                    } else if (index == 2){
                        index_three_anim();
                        remove_four_anim();
                    }
                }
                else if (direction == "up") {

                    if (index == 0) {
                        remove_one_anim();
                        index_two_anim();
                    } else if (index == 1){
                        remove_two_anim();
                        index_three_anim();
                    } else if (index == 2){
                        remove_three_anim();
                        index_four_anim();
                    } else if (index == 3){
                        return;
                    }

                    $('.slider').css('-webkit-transform', 'translateY(-' + ((index + 1) * 100) + '%)');
                    index++;
                }
            }
        }
    );

});

$('.img-index-1-title').click(function () {
    index_one_anim();
})

var currIndex = 0;
var rightAnswerCount = 0;

function initView(index) {
    $('.question').html(data.questions[index].question);
    var answer = [];
    for (var answerIndex = 0; answerIndex < data.questions[currIndex].answers.length; answerIndex++) {
        answer.push('<li class="btn-answer" id=' + data.questions[currIndex].answers[answerIndex].id + '>' + data.questions[index].answers[answerIndex].value + '</li>');
    }
    $('.answers').html(answer);

    $('.div-exam').show();
    $('.div-exam-view').removeClass('animated bounceOutLeft').addClass('animated fadeIn');

    var isClickAble = true;
    $('.div-exam-view').find('li').click(function () {
        if (!isClickAble) return;
        isClickAble = false;

        var thisLi = $(this);
        var curId = thisLi.context.id;
        var rightId = data.questions[currIndex].correctAnswer;
        if (curId == rightId) {
            thisLi.addClass('success');
            rightAnswerCount++;
        } else {
            thisLi.addClass('wrong');
            $('#' + rightId).addClass('success');
        }
        console.log(rightAnswerCount);

        if (currIndex == data.questions.length - 1) {
            setTimeout(function () {
                $('.div-exam').fadeOut(800, function () {
                    // addExamResult(rightAnswerCount);
                    initResultView(rightAnswerCount);
                });
            }, 1000);
        } else {
            currIndex++;
            setTimeout(function () {
                $('.div-exam-view').removeClass('fadeIn').addClass('bounceOutLeft');
                setTimeout(function () {
                    initView(currIndex);
                }, 600);
            }, 1000);
        }
    });
}

function showResultView(score){
    $('.css-slider-wrapper').hide();
    initResultView(score);
}

function initResultView(score){
    var returnString;

    if(score == -1){
        $('.div-give-up-view').fadeIn(800);
        index_five_anim();
        showGiveUpView();
        return;
    } else if (score == 0) {
        returnString = '<img class="img-result-1-bg" src="img/img-index-5-bg.png"/>' +
            '<img class="img-result-1-pic" src="img/img-result-1-man.png" /><br/>' +
            '<img class="img-result-1-title" src="img/img-result-1-title.png"/>';
    } else if (score == 3) {
        $('.div-exam-result').css('background-color','#FDC636');
        returnString = '<img class="img-result-2-man" src="img/img-result-2-man.png"/><br/>' +
            '<img class="img-result-2-man-bg" src="img/img-result-2-man-bg.png"/>' +
            '<img class="img-result-2-title" src="img/img-result-2-title.png"/>';
    } else {
        $('.div-exam-result').css('background-color','#FDC636');
        returnString = '<img class="img-result-2-man" src="img/img-result-3-man.png"/><br/>' +
            '<img class="img-result-3-man-bg" src="img/img-result-3-man-bg.png"/>' +
            '<img class="img-result-2-title" src="img/img-result-3-title.png"/>';
    }

    returnString+='<div class="div-button"><div id="share-result" class="div-blue-bg" onclick="share()">告诉朋友他是死是活</div>' +
        '<div id="design-exam" class="div-blue-bg" onclick="design()">我也想被绑架</div></div><div class="div-comment-view"></div>';

    $('.div-exam-result').html(returnString);
    initCommentView();
    $('.div-exam-result').fadeIn(800);
}

function share() {
    $('.div-share-view').show();
}

$('.div-share-view').click(function () {
    $('.div-share-view').hide();
});

function design(){
    window.location.href = 'design.html';
}

$('.leftText').click(function () {
    $('.css-slider-wrapper').fadeOut(800, function () {
        $('.div-give-up-view').fadeIn(800);
        // addExamResult(-1);
        index_five_anim();
        showGiveUpView();
    });
});

function showGiveUpView(){
    var returnString ='<div class="div-button"><div id="share-result" class="div-blue-bg" onclick="share()">告诉朋友他是死是活</div>' +
        '<div id="design-exam" class="div-blue-bg" onclick="design()">我也想被绑架</div></div><div class="div-comment-view"></div>';

    $('.div-give-up-view').append(returnString);
    // initCommentView();
}

$('.rightText').click(function () {
    $('.css-slider-wrapper').fadeOut(1000, function () {
        initView(currIndex);
    });
});

function startGame(){
    hideLoading();
    $('.div-bottom-title').html('已经有 '+data.joinCount+' 人参与');
    $('.nickname').html(data.nickname);

    index_one_anim();

    //TODO 是否从壹号柜分享出去
    if (!data){
        $('.img-index-1-title').attr('src', 'img/img-index-1-mine-title.png');

    } else {
        $('.img-index-1-title').attr('src', 'img/img-index-1-title.png');
    }
}

function showLoading(){
    $('.loading').show();
}

function hideLoading(){
    $('.loading').hide();
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

if (typeof examPage == 'undefined') {
	examPage='';
}
var data = examPage || {
    "joinCount": 0,
    "id": 1,
    "openid": "o3bYWt-thk-GDL8T6azPDpE9OGzw",
    "loginOpenId":'o3bYWt-thk-GDL8T6azPDpE9OGzw1',
    "nickname": "阳光漫步",
    "headimgurl": "http://wx.qlogo.cn/mmopen/YR1LgCHqssibVLmwCCtjibpO1YJ6pvAUsP7Vq9JjXBgDttzf8yIVWyqKdk4rUIEerV38JZrIQ3pLWpUr4tjhfB7kGqUhvRpbiab/0",
    'questions': [{
        'question': '11111111111111111111111111111111111111111111111',
        'answers': [
            {
                'id': '1',
                'value': 'JavaScript库'
            },
            {
                'id': '2',
                'value': 'CSS库'
            },
            {
                'id': '3',
                'value': 'PHP框架'
            },
            {
                'id': '4',
                'value': '以上都不是以上都不是'
            }
        ],
        'correctAnswer': '1'
    }, {
        'question': '找出不同类的一项?',
        'answers': [
            {
                'id': '1',
                'value': '写字台'
            },
            {
                'id': '2',
                'value': '沙发'
            },
            {
                'id': '3',
                'value': '电视'
            },
            {
                'id': '4',
                'value': '桌布'
            }
        ],
        'correctAnswer': '3'
    }, {
        'question': '国土面积最大的国家是：',
        'answers': [
            {
                'id': '1',
                'value': '美国'
            },
            {
                'id': '2',
                'value': '中国'
            },
            {
                'id': '3',
                'value': '俄罗斯'
            },
            {
                'id': '4',
                'value': '加拿大'
            }
        ],
        'correctAnswer': '3'
    }]
};
