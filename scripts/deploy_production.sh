#!/bin/bash

echo "enter deploy_wrap"

DEPLOYPROJECTNAME="nclientAsset"
NEWVERSION=$(git rev-parse --short HEAD)
DEPLOYCOPY="~/DEPLOY/"
DEPLOYDEST="/home/wwwroot/assets.senyu.me/public_html/knewsAsset/prod/deploy/"
DEPLOYFILENAME=deploy_${DEPLOYPROJECTNAME}_${NEWVERSION}.tar.gz
DEPLOYSERVER="deploy@senyu.me"
DEPLOYMODE="PRODUCTION"

echo $DEPLOYPROJECTNAME
echo $NEWVERSION
echo $DEPLOYCOPY
echo $DEPLOYDEST
echo $DEPLOYFILENAME
echo $DEPLOYSERVER

cd ${GITBASE}/build
tar -zcf ../$DEPLOYFILENAME *

scp -i ~/.ssh/id_rsa  -o StrictHostKeyChecking=no -p 22 ../${DEPLOYFILENAME} ${DEPLOYSERVER}:${DEPLOYCOPY}
#ssh -i ~/.ssh/id_rsa  -o StrictHostKeyChecking=no -p 22 $DEPLOYSERVER "ls -l $DEPLOYCOPY;"
ssh -i ~/.ssh/id_rsa  -o StrictHostKeyChecking=no -p 22 ${DEPLOYSERVER} "${DEPLOYCOPY}/remote_execute_asset.sh ${NEWVERSION} ${DEPLOYCOPY} ${DEPLOYDEST} ${DEPLOYPROJECTNAME} ${DEPLOYFILENAME} ${DEPLOYMODE}"