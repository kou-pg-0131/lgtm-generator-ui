terraform {
  backend "s3" {
    bucket  = "lgtm-generator-ui-tfstates"
    region  = "us-east-1"
    key     = "terraform.tfstate"
    profile = "default"
    encrypt = true
  }
}
