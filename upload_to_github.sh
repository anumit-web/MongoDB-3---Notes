git add --all
sleep 5  # Waits 5 seconds.

git commit -m "Add files"
sleep 5  # Waits 5 seconds.

git pull --rebase origin main
sleep 10  # Waits 5 seconds.

git push -u origin main
sleep 10  # Waits 5 seconds.

