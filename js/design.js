'use strict';

$(function () {
    var isShowShareView = getQueryString('isShowShareView');
    if (isShowShareView){
        $('#input-view').hide();
        showShareView('');
        initCommentView(getQueryString('examId'));
    }

});

var addExamId='';
var questionCount = 0;

var currIndex = 0;
var questions = [
    {
        question:'',
        answers:[]
    },
    {
        question:'',
        answers:[]
    },
    {
        question:'',
        answers:[]
    },
    {
        question:'',
        answers:[]
    }
];

$('.next-step').click(function () {

    currIndex++;
    $('.question-input').removeAttr("disabled");
    $('.design-input').removeAttr("disabled");

    if (questions[currIndex] && questions[currIndex].question){
        if(questionCount!=currIndex){
            $('.design-input').attr("disabled",true);
            $('.question-input').attr("disabled",true);
        }

        $('.design-input').val('');
        $('.question-input').val(questions[currIndex].question);
        for(var i=0; i<questions[currIndex].answers.length;i++){
            $('.design-input:eq('+i+')').val(questions[currIndex].answers[i]);
        }
    } else {

        if(questionCount==currIndex){
            $('.question-input').val('');
            $('.design-input').val('');
        } else {
            var question = $('.question-input').val();
            var answers = [];
            for(var i=0; i<$('.design-input').length;i++){
                var value = $('.design-input:eq('+i+')').val();
                if (value){
                    answers.push(value);
                }
            }

            if(!question){
                drawToast('请输入题目');
                currIndex--;
                return;
            }

            if (!$('.design-input:eq(0)').val()){
                drawToast('请输入正确答案');
                currIndex--;
                return;
            }

            if (answers.length<2){
                drawToast('请至少输入2个答案');
                currIndex--;
                return;
            }

            questionCount++;
            addExamQuetion(addExamId, questionCount, question, answers, function (result) {
                addExamId=result;
                var data = {
                    question:'',
                    answers:[]
                };
                data.question = question;
                data.answers = answers;
                questions[questionCount-1]=data;

                if (questionCount == 3){
                    $('#input-view').fadeOut(800, function () {
                        showShareView(result);
                    });
                    return;
                }

                $('#input-view').removeClass('bounceOutLeft').addClass('animated fadeIn');
                $('.question-input').val('');
                $('.design-input').val('');
            });
        }
    }

    if (currIndex>0){
        $('.pre-step').show();
    }

});

$('.pre-step').click(function () {

    var question = $('.question-input').val();
    var answers = [];
    for(var i=0; i<$('.design-input').length;i++){
        var value = $('.design-input:eq('+i+')').val();
        if (value){
            answers.push(value);
        }
    }
    var data = {
        question:'',
        answers:[]
    };
    data.question = question;
    data.answers = answers;
    if (question){
        if (currIndex==1){
            questions[1]=data;
        } else{
            questions[questionCount]=data;
        }
    }

    currIndex--;
    if (currIndex == 0){
        $('.pre-step').hide();
    }



    $('.question-input').val(questions[currIndex].question);
    $('.design-input').val('');
    for(var i=0; i<questions[currIndex].answers.length;i++){
        $('.design-input:eq('+i+')').val(questions[currIndex].answers[i]);
    }
    $('.design-input').attr("disabled",true);
    $('.question-input').attr("disabled",true);
});

function showShareView(examId){
    $('.div-share-view').show();
    $('.img-background').hide();
    //initCommentView(examId);
}

function share() {
    $('.div-share').show();
}

$('.div-share').click(function () {
    $('.div-share').hide();
});


var intervalCounter = 0;
function hideToast() {
    var alert = document.getElementById("toast");
    if(alert != null) alert.remove();
    clearInterval(intervalCounter);
}
function drawToast(message) {
    var alert = document.getElementById("toast");
    if (alert == null) {
        var toastHTML = '<div id="toast">' + message + '</div>';
        document.body.insertAdjacentHTML('beforeEnd', toastHTML);
    }
    else {
        $('#toast').html(message);
        alert.style.opacity = .9;
    }
    intervalCounter = setInterval("hideToast()", 2000);
}

function addExamQuetion(examId, num, question, options, callback) {
    callback(1);
}
