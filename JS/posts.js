let postsContainer = document.querySelector('.posts-container');
let searchTags = [];

const renderPosts = () => {
    let i = posts.actualIndex;

    while (posts.actualIndex < posts.stepSize) {
        let postContainer = document.createElement('div');
        postContainer.classList.add('post-container');

        let postImgContainer = document.createElement('div');
        postImgContainer.classList.add('post-img-container');

        let postImg = document.createElement('img');
        postImg.classList.add('post-img');
        postImg.setAttribute('src', posts.posts[posts.actualIndex].img);

        postImgContainer.appendChild(postImg);

        let postDescription = document.createElement('div');
        postDescription.classList.add('post-description');

        let postDescriptionH1 = document.createElement('h1');
        postDescriptionH1.textContent = posts.posts[posts.actualIndex].title;
        postDescriptionH1.classList.add('title-post')
        postDescription.appendChild(postDescriptionH1);

        postContainer.appendChild(postImgContainer);
        postContainer.appendChild(postDescription);

        postContainer.setAttribute('id', posts.posts[posts.actualIndex]._id);

        if (i < posts.quantPosts) {
            postContainer.addEventListener('click', (e) => {
                const element = e.target.parentElement;

                window.location.href = 'http://' + window.location.host + '/HTML/seeSpecificPost.html?id=' + element.getAttribute('id');
            })
            i++;
        }

        postsContainer.appendChild(postContainer);

        posts.actualIndex = posts.actualIndex + 1;
    }
}

const renderPost = (index) => {
    let postContainer = document.createElement('div');
    postContainer.classList.add('post-container');

    let postImgContainer = document.createElement('div');
    postImgContainer.classList.add('post-img-container');

    let postImg = document.createElement('img');
    postImg.classList.add('post-img');
    postImg.setAttribute('src', posts.posts[index].img);

    postImgContainer.appendChild(postImg);

    let postDescription = document.createElement('div');
    postDescription.classList.add('post-description');

    let postDescriptionH1 = document.createElement('h1');
    postDescriptionH1.textContent = posts.posts[index].title;
    postDescriptionH1.classList.add('title-post')
    postDescription.appendChild(postDescriptionH1);

    postContainer.appendChild(postImgContainer);
    postContainer.appendChild(postDescription);

    return postContainer;
}

const removeTagsSelected = () => {
    const tags = document.querySelectorAll('.tag');

    for (let i = 0; i < tags.length; i++) {
        if (tags[i].classList.contains('tag-selected')) {
            tags[i].classList.remove('tag-selected');
        }
    }
}

const showPosts = () => {
    const postContainer = document.querySelector('.posts-container');

    while (postContainer.childNodes.length > 0) {
        postContainer.removeChild(postContainer.lastChild);
    }

    let i = 0;
    const results = []

    for (; i < searchTags.length; i++) {
        const category = searchTags[i];

        for (let j = 0; j < posts.quantPosts; j++) {
            const tagsVector = posts.posts[j].tag.map(element => element.name)

            if (tagsVector.indexOf(category) != -1) {
                let flagResultAdded = false;

                for (let k = 0; k < results.length; k++) {
                    if (results[k].index == k) {
                        flagResultAdded = true;
                        break;
                    }
                }
                if (flagResultAdded == false) {
                    results.push({ index: j, post: posts.posts[j], tags: tagsVector });
                }
                continue;
            }
        }
    }

    for (i = 0; i < results.length; i++) {
        postContainer.appendChild(renderPost(results[i].index));
    }

    if (searchTags.length == 0) {
        const noTagSelected = document.createElement('h2');
        noTagSelected.classList.add('no-tags-selected');
        noTagSelected.innerText = 'Escolha as tags que pretende pesquisar';
        postContainer.appendChild(noTagSelected);
    }
    else if (results.length == 0) {
        const noResultInfo = document.createElement('h2');
        noResultInfo.classList.add('no-results-found');
        noResultInfo.innerText = 'Sem resultados encontrados';
        postContainer.appendChild(noResultInfo);
    }
}

const renderTags = () => {
    let i = 0;
    const tagList = document.querySelector('.tag-list');

    while (i < posts.tags.length) {
        const newTag = document.createElement('li');
        newTag.textContent = posts.tags[i].name;
        newTag.classList.add('tag');

        newTag.addEventListener('click', (e) => {
            const element = e.target;
            const name = element.innerText;


            if (element.classList.contains('tag-selected')) {
                element.classList.remove('tag-selected');
                searchTags.splice(searchTags.indexOf(name), 1);
            } else {
                element.classList.add('tag-selected');
                searchTags.push(name);
            }
            showPosts();
        })
        tagList.appendChild(newTag);
        i++;
    }
}

function forwardPosts() {
    const offsetPosts = posts.endIndex + posts.stepSize;
    const newEnd = offsetPosts <= posts.quantPosts ? offsetPosts : posts.quantPosts;

    posts.endIndex = newEnd;
    let i = posts.actualIndex;

    while (posts.actualIndex < newEnd) {
        let postContainer = renderPost(i);

        postContainer.setAttribute('id', posts.posts[posts.actualIndex]._id);

        if (i < posts.quantPosts) {
            postContainer.addEventListener('click', (e) => {
                const element = e.target.parentElement;

                window.location.href = 'http://' + window.location.host + '/HTML/seeSpecificPost.html?id=' + element.getAttribute('id');
            })
            i++;
        }

        postsContainer.appendChild(postContainer);

        posts.actualIndex = posts.actualIndex + 1;
    }
}

function backwardPosts() {
    const postsElements = document.querySelectorAll('.post-container');
    const backwardButton = document.querySelectorAll('.post-controller-backward');
    const offsetPosts = postsElements.length - posts.stepSize;
    let quantElementsToDelete = offsetPosts > 0 ? posts.stepSize : posts.actualIndex;
    let flagBackwardWorded = false;
    posts.endIndex = posts.endIndex - quantElementsToDelete;

    while (quantElementsToDelete > 0) {
        postsContainer.removeChild(postsContainer.lastChild);
        quantElementsToDelete--;
        posts.actualIndex -= 1;
        if (flagBackwardWorded == false) {
            flagBackwardWorded = true;
        }
    }
}

const getPostsFromAPI = () => {
    fetch('http://127.0.0.1:3000/show-all-posts')
        .then((res) => res.json())
        .then((data) => {
            posts.quantPosts = data.size;
            posts.stepSize = posts.quantPosts > 4 ? 4 : posts.quantPosts;
            posts.endIndex = posts.stepSize;
            posts.posts = data.posts;

            fetch('http://127.0.0.1:3000/select-all-tags')
                .then((res) => res.json())
                .then((data) => {
                    posts.tags = data.tag;
                    renderPosts();
                    renderTags();
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        })
}


let posts = {
    quantPostsVisible: 0,
    quantPosts: 0,
    startIndex: 0,
    actualIndex: 0,
    endIndex: 0,
    stepSize: 0,
    posts: [],
    tags: []
}

getPostsFromAPI();