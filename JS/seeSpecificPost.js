const postID = window.location.href.split('?')[1].split('=')[1]

const getPost = () => {
    fetch('http://127.0.0.1:3000/show-post/' + postID)
    .then((res) => res.json())
    .then((data) => {
        post = data.posts[0];
        document.querySelector('.post-title').innerText = post.title;
        document.querySelector('.post-text').innerText = post.text;
        document.querySelector('.post-author').innerText = post.author;
        document.querySelector('.post-data').innerText = post.data == undefined ? new Date().getDate() : post.data;
    })
    .catch((err) => {
        console.log(err);
    })
}


let post = null;

getPost();