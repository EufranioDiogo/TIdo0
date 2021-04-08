const postID = window.location.href.split('?')[1].split('=')[1]

const getPost = () => {
    fetch('https://rocky-inlet-66290.herokuapp.com/show-post/' + postID)
    .then((res) => res.json())
    .then((data) => {
        post = data.post;
        document.querySelector('.post-title').innerText = post.title;
        document.querySelector('.post-text-container').innerHTML = post.text;
        document.querySelector('.post-author').innerText = post.author;
        document.querySelector('.post-data').innerText = post.data == undefined ? new Date().getDate() : post.data;

        document.querySelector('.loading').style.display = 'none';
    })
    .catch((err) => {
        console.log(err);
        document.querySelector('.loading').style.display = 'none';
    })
}


let post = null;

getPost();