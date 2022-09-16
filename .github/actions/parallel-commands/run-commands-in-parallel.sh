# Extract the provided commands from the stringified JSON array.
IFS=$'
' read -d '' -a userCommands < <((jq -c -r '.[]') <<<"$1")

# Invoke the provided commands in parallel and collect their exit codes.
pids=()
for userCommand in "${userCommands[@]}"; do
eval "$userCommand" & pids+=($!)
done

# If any one of the invoked commands exited with a non-zero exit code, exit the whole thing with code 1.
for pid in ${pids[*]}; do
if ! wait $pid; then
exit 1
fi
done

# All the invoked commands must have exited with code zero.
exit 0
