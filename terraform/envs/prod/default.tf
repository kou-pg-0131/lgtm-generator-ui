provider "aws" {
  profile = "default"
  region  = "us-east-1"
}

module "main" {
  source = "../.."
  stage  = var.stage
}
