function getTopPosts() {
    fetch('http://127.0.0.1:3000/top-posts')
        .then((res) => res.json())
        .then((data) => {
            const topPosts = data.posts;
            let i = 0;

            /*
            <div class="post-container">
                <div class="post-photo-img-container">
                    <img src="IMG/pexels-thisisengineering-3912981.jpg" alt="" class="post-img">
                </div>
                <div class="post-description">
                    <h3 class="post-title">Post title</h3>
                </div>
            </div>
            */



            while (i < topPosts.length) {
                let post = topPosts[i];
                const postContainer = document.createElement('div');
                postContainer.classList.add('post-container');
                const postPhotoImgContainer = document.createElement('div');
                postPhotoImgContainer.classList.add('post-photo-img-container');
                const postImg = document.createElement('img');
                postImg.classList.add('post-img');
                const postDescription = document.createElement('div');
                postDescription.classList.add('post-description');
                const postTitle = document.createElement('h3');
                postTitle.classList.add('post-title');

                postImg.src = post.img;
                postPhotoImgContainer.appendChild(postImg);
                postContainer.appendChild(postPhotoImgContainer);

                postTitle.innerText = post.title;
                postDescription.appendChild(postTitle);
                postContainer.appendChild(postDescription);


                postContainer.setAttribute('id', post['_id']);
                postContainer.addEventListener('click', (event) => {
                    const id = post['_id'];

                    window.location.href = 'http://' + window.location.host + '/HTML/seeSpecificPost.html?id=' + id;
                })

                document.querySelector('.posts-container').appendChild(postContainer)
                i++;
            }
        })
        .catch((err) => {
            console.log('error getting top posts')
        })
}


getTopPosts();