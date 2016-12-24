/**
 * Created by lhy95 on 2016/12/13.
 */

$(function () {

    let remoteUrl = 'http://115.159.184.76:3001/api/comments/';

    let searchContent = '';
    let numberPerPage = 5;
    let pageNum = 1;

    let queryParam = {
        filter: {
            where: {
                title: '//'
            },
            order: 'DESC',
            limit: 10,
            offset: 10 * (pageNum - 1)
        }
    };

    getTotalNumber(remoteUrl, numberPerPage);

    $('#searchBtn').on('click', function () {
        queryParam = getQueryParam();
        getCommentFromServer(queryParam);
    });

    $('#submitBtn').on('click', function () {
        addNewCommentToServer();
        getCommentFromServer();
    });

});

function getTotalNumberFinish() {
    getCommentFromServer(queryParam);
}

function getTotalNumber(url, numberPerPage) {
    $.get({
        url: url + 'count',
        success(res) {
            // 获取总条数
            let pageNum = parseInt(res.count / numberPerPage);
            getTotalNumberFinish();
        }
    })
}

function getQueryParam() {
    let searchText = $('#search').val();
    let queryParam = {};
    if (searchText !== '') {
        queryParam = {
            filter: {
                where: {
                    title: {
                        regexp: '/' + searchText + '/'
                    }
                }
            }
        }
    } else {
        queryParam = {};
    }
    return queryParam;
}

function getCommentFromServer(queryParam) {
    $('#comment-container').empty();
    let insertString = '';
    $.get({
        url: 'http://115.159.184.76:3001/api/comments',
        data: queryParam,
        success: function (res) {
            // console.log(res);
            for (let item of res) {
                // console.log(item);
                insertString += '<div><h3>' + item.title + '</h3><p>' + item.content + '</p><p>' + item.time + '</p><button id="' + item.id + '" class="delete">删除</button></div>'
            }
            $('#comment-container').append(insertString);

            $('button.delete').each(function () {
                $(this).click(function () {
                    let id = $(this)[0].id;
                    console.log(id)
                    deleteComment(id.toString());
                })
            })
        }
    });
}

function addNewCommentToServer() {
    let postData = {
        title: $('#title').val(),
        content: $('#content').val(),
        time: Date()
    };

    $.post({
        url: 'http://115.159.184.76:3001/api/comments',
        data: postData,
        success(res) {
            // console.log(res);
        }
    })
}

function deleteComment(id) {
    $.ajax({
        type: 'DELETE',
        url: 'http://115.159.184.76:3001/api/comments/' + id,
        success: function (res) {
            console.log(123);
            let queryParam = {};
            getCommentFromServer(queryParam);
        }
    })
}