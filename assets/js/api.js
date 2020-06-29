function loadItems(hashtag, maxResults) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                let jsonArr = JSON.parse(xhttp.responseText);
                let contentItems = document.querySelector("#list-item-row");
                const truncate = (input, length) => input.length > length ? `${input.substring(0, length)}...` : input;
                const fbLink = (url) => {
                    let totalurl=encodeURIComponent(url);

                    return 'http://www.facebook.com/sharer.php?u='+totalurl;
                };
                contentItems.innerHTML = "";
                for (let i = 0 ; i < jsonArr.length ; i++) {
                    contentItems.innerHTML += `
                        <div class="col s12 m4">
                            <div class="card">
                                <div class="card-image">
                                    <img class="card-img-top" src="${jsonArr[i].image}" alt="content1"/>
                
                                </div>
                                <div class="card-content">
                                    <div class="card-body">
                                        <p>${jsonArr[i].caption.replace(/\#\S+/g,'').replace(/\@\S+/g,'*')}</p>
                                    </div>
                                </div>
                                <div class="card-action">
                                    <div class="row flex">
                                        <div class="col s6 valign-wrapper">
                                            <div class="tags">
                                                <small class="text-muted"><i class="fa fa-link"></i>&nbsp;&nbsp;<a href="https://instagram.com/${jsonArr[i].username}" style="margin-right: 0px">@${truncate(jsonArr[i].username, 10)}</a></small>
                                            </div>
                                        </div>
                                        <div class="col s6">
                                            <div class="share-buttons right-align">
                                                <a class="waves-effect waves-teal btn-flat" href="https://twitter.com/intent/tweet?url=https://innodev.vnetcloud.com/instaloot/${jsonArr[i].id}.jpg&text=${truncate(jsonArr[i].caption, 20)}" target="_blank"><i class="fa fa-twitter"></i></a>
                                                <a class="waves-effect waves-teal btn-flat" href="${fbLink('https://innodev.vnetcloud.com/instaloot/' + jsonArr[i].id) + '.jpg'}"><i class="fa fa-facebook"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }
            }
        }
    };

    xhttp.open("GET", "http://innodev.vnetcloud.com/qtipid/?hashtag=" + hashtag + "&max_results=" + maxResults, true);
    xhttp.send();
}
