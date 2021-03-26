resource "aws_cloudfront_distribution" "deployment" {
  enabled             = true
  default_root_object = "index.html"

  origin {
    domain_name = "${aws_s3_bucket.deployment.id}.s3.amazonaws.com"
    origin_id   = aws_s3_bucket.deployment.id
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.deployment.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    target_origin_id       = aws_s3_bucket.deployment.id
    viewer_protocol_policy = "redirect-to-https"
    cached_methods         = ["GET", "HEAD"]
    allowed_methods        = ["GET", "HEAD"]
    compress               = true

    default_ttl = 3600
    max_ttl     = 86400
    min_ttl     = 0

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }

      headers = []
    }
  }

  aliases      = [local.domain]
  http_version = "http2"

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.main.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2018"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  custom_error_response {
    error_caching_min_ttl = 300
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
  }

  custom_error_response {
    error_caching_min_ttl = 300
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }
}

resource "aws_cloudfront_origin_access_identity" "deployment" {}
