variable "stage" { default = "prod" }

terraform {
  backend "s3" {
    bucket  = "lgtm-generator-ui-tfstates"
    region  = "us-east-1"
    key     = "prod/terraform.tfstate"
    profile = "default"
    encrypt = true
  }
}
