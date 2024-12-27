{
  description = "A nix flake for building my blog";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs = {
    self,
    nixpkgs,
    flake-utils,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
    in
      with pkgs; {
        default = derivation {
          inherit system src;
          builder = with pkgs; "${fish}/bin/fish";
        };
        formatter = nixpkgs.legacyPackages.${system}.alejandra;
        devShells.default =
          import ./shell.nix {inherit pkgs;};
      });
}
