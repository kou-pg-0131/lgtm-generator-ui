variable stage { type = string }

locals {
  sub_domain = var.stage == "prod" ? "" : "${var.stage}."
  domain     = "${local.sub_domain}lgtm-generator.kou-pg.com"
  product    = "lgtm-generator-ui"
  prefix     = "${local.product}-${var.stage}"
}
