{pkgs ? import <nixpkgs> {}}:
pkgs.mkShellNoCC {
  name = "sprqpt's shell";
  buildInputs = with pkgs; [
    deno
    astro-language-server
    svelte-language-server
    typescript-language-server
    vscode-extensions.denoland.vscode-deno
    vscode-langservers-extracted
  ];
  shellHook = ''
    deno i --allow-scripts
    deno run -A npm:astro telemetry disable
  '';
}
