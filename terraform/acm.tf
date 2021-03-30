resource "aws_acm_certificate" "main" {
  domain_name       = "lgtm-generator.kou-pg.com"
  validation_method = "DNS"
  tags              = { Name = local.prefix }
}
