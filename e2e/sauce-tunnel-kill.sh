ps aux | grep bin/sc | grep -v grep | awk '{print $2}' | xargs kill -9
