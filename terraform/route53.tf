data aws_route53_zone main {
  name         = "kou-pg.com"
  private_zone = false
}

resource aws_route53_record certificate_validation {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = aws_acm_certificate.main.domain_validation_options.*.resource_record_name[0]
  type    = aws_acm_certificate.main.domain_validation_options.*.resource_record_type[0]
  records = [aws_acm_certificate.main.domain_validation_options.*.resource_record_value[0]]
  ttl     = 60
}

resource aws_acm_certificate_validation main {
  certificate_arn         = aws_acm_certificate.main.arn
  validation_record_fqdns = [aws_route53_record.certificate_validation.fqdn]
}

resource aws_route53_record main {
  zone_id = data.aws_route53_zone.main.id
  name    = local.domain
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.deployment.domain_name
    zone_id                = aws_cloudfront_distribution.deployment.hosted_zone_id
    evaluate_target_health = false
  }
}
