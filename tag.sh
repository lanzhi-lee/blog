#!/bin/bash

prefix="blogs"

function git-tag() {
    git push
    git pull --tags
    local new_tag=$(echo ${prefix}-$(date +'%Y%m%d')-$(git tag -l "${prefix}-$(date +'%Y%m%d')-*" | wc -l | xargs printf '%02d'))
    echo ${new_tag}
    git tag ${new_tag}
    git push origin $new_tag
}

git-tag;
