
BASEDIR=$(dirname "$0")
echo "$BASEDIR"

echo "[Info] Deploy UI"
npm run build --prefix $BASEDIR

DEPLOY_PATH="/Users/alfarie/Documents/Grobot-Project/@Project/sg-lts/mpu/p_sg-mpu/Deploy/dist"
DIST_PATH="/Users/alfarie/Documents/Grobot-Project/@Project/sg-lts/mpu/p_sg-mpu/dist"

echo $DEPLOY_PATH

if [ ! -d "$DEPLOY_PATH" ]; then  # for file "if [-f /home/rama/file]" 
    echo "[Info] Create dist in SG MPU Project"
    mkdir $DEPLOY_PATH
fi

if [ ! -d "$DIST_PATH" ]; then  # for file "if [-f /home/rama/file]" 
    echo "[Info] Create dist in SG MPU Project"
    mkdir $DIST_PATH
fi

echo "[Info] Move Build to dist $DEPLOY_PATH"
cp -r $BASEDIR/dist $DEPLOY_PATH
cp -r $BASEDIR/dist $DIST_PATH

cp $BASEDIR/index.html $DEPLOY_PATH
cp $BASEDIR/index.html $DIST_PATH

if [ ! -d "$DIST_PATH/src/assets" ]; then  # for file "if [-f /home/rama/file]" 
    echo "[Info] Create dist in SG MPU Project"
    mkdir -p $DIST_PATH/src
fi

if [ ! -d "$DEPLOY_PATH/src/assets" ]; then  # for file "if [-f /home/rama/file]" 
    echo "[Info] Create dist in SG MPU Project"
    mkdir -p $DEPLOY_PATH/src
fi

cp -r $BASEDIR/src/assets $DIST_PATH/src
cp -r $BASEDIR/src/assets $DEPLOY_PATH/src

# dist -> dist, src, index.html
