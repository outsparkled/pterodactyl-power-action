# pterodactyl-power-action

A Github Action to automatically send a power action to a pterodactyl server

## What is this useful for?

You can set up Pterodactyl to automatically pull from a git repository on restart. 
This action can be used to automatically restart a pterodactyl server when a new commit is pushed.

## How can I use this?

Please refer to [this article](https://docs.github.com/en/actions/quickstart) for a guide on how to set up an action.

An example workflow for the scenario described above might look like this:

```yaml
name: My Pterodatyl Restarter
on: [ push ]
jobs:
  restart-server:
    runs-on: ubuntu-latest
    steps:
      - name: restart
      - uses: outsparkled/pterodactyl-power-action@main
        with:
          panel-url: 'https://panel.example.com'
          server-id: ${{ secrets.SERVER_ID }}
          bearer-token: ${{ secrets.BEARER_TOKEN }}
          power-action: 'restart'
```

You should always use [secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) to store your bearer token.

## Inputs

### `panel-url`

**Required.** The URL of the panel.

### `server-id`

**Required.** The ID of the server you want to send a power action to.

### `bearer-token`
**Required.** The bearer token to auth with, this will usually be your Pterodactyl API key. 
Use a [secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets) to supply this value.

### `power-action`

The power action to send. Defaults to 'restart'.

## Contributing

Feel free to open a pull request! Please run `npm run build` before committing.
