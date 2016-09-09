/**
 *
 * Created by huang on 2016/8/15.
 */
function index_one_anim(){

    $('.img-index-1-title').addClass('animated bounceIn');
    setTimeout(function () {
        $('.img-index-1-man').addClass('animated bounceIn');
        setTimeout(function () {
            $('.img-index-1-bg').addClass('animated fadeIn');
            $('.img-left-spread').addClass('animated infinite fadeInUp');
        },100);
    },100);
}

function remove_one_anim(){
    setTimeout(function () {
        $('.img-index-1-title').removeClass('bounceIn');
        $('.img-index-1-man').removeClass(' bounceIn');
        $('.img-index-1-bg').removeClass(' fadeIn');
        $('.img-left-spread').removeClass(' infinite fadeInRight');
    },1000);
}

function index_two_anim(){
    $('.img-index-2-light').addClass('animated fadeIn');
    $('.img-index-2-shadow').addClass('animated fadeIn');
    setTimeout(function () {
        $('.img-index-2-bg').addClass('animated fadeIn');
        setTimeout(function () {
            $('.img-index-2-friend').addClass('animated fadeIn');
            $('.img-index-2-man').addClass('animated fadeIn');
            setTimeout(function () {
                $('.img-index-2-title').addClass('animated bounceIn');
                $('.div-user-1').addClass('animated fadeIn').css('opacity','1');
            },200);
        },100);
    },500);
}

function remove_two_anim() {
    setTimeout(function () {
        $('.img-index-2-light').removeClass('animated fadeIn');
        $('.img-index-2-shadow').removeClass('animated fadeIn');
        $('.img-index-2-bg').removeClass('animated fadeIn');
        $('.img-index-2-friend').removeClass('animated fadeIn');
        $('.img-index-2-man').removeClass('animated fadeIn');
        $('.img-index-2-title').removeClass('animated bounceIn');
        $('.div-user-1').removeClass('animated fadeIn');
    },1000);
}

function index_three_anim(){
    $('.img-index-3-bottom').addClass('animated fadeIn');
    setTimeout(function () {
        $('.img-index-3-left').addClass('animated rotateInDownLeft');
        $('.img-index-3-right').addClass('animated rotateInDownRight');
        setTimeout(function () {
            $('.img-index-3-bg').addClass('animated fadeIn');
            setTimeout(function () {
                $('.img-index-3-title-bg').addClass('animated fadeIn');
                setTimeout(function () {
                    $('.img-index-3-title').addClass('animated bounceIn');
                    $('.div-user-2').addClass('animated fadeIn');
                },200);
            },200);
        },200);
    },1000);
}

function remove_three_anim() {
    setTimeout(function () {
        $('.img-index-3-bottom').removeClass('animated fadeIn');
        $('.img-index-3-left').removeClass('animated rotateInDownLeft');
        $('.img-index-3-right').removeClass('animated rotateInDownRight');
        $('.img-index-3-bg').removeClass('animated fadeIn');
        $('.img-index-3-title-bg').removeClass('animated fadeIn');
        $('.img-index-3-title').removeClass('animated bounceIn');
        $('.div-user-2').removeClass('animated fadeIn');
    },1000);
}

function index_four_anim(){
    $('.leftText').addClass('animated fadeInLeft');
    $('.rightText').addClass('animated fadeInRight');
}

function remove_four_anim(){
    $('.leftText').removeClass('animated fadeInLeft');
    $('.rightText').removeClass('animated fadeInRight');
}

function index_five_anim(){
    $('.img-index-5-bg').addClass('animated fadeIn');
    setTimeout(function () {
        $('.img-index-5-head').addClass('animated fadeIn');
        setTimeout(function () {
            $('.img-index-5-man').addClass('animated fadeIn');
            setTimeout(function () {
                $('.img-index-5-title').addClass('animated fadeIn');
            },300);
        },300);
    },300);
}
