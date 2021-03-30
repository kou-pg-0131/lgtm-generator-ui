resource "aws_s3_bucket" "deployment" {
  bucket        = "${local.prefix}-deployment"
  acl           = "private"
  force_destroy = true
  tags          = { Name = "${local.prefix}-deployment" }
}

resource "aws_s3_bucket_policy" "deployment" {
  bucket = aws_s3_bucket.deployment.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          AWS = aws_cloudfront_origin_access_identity.deployment.iam_arn
        }
        Action   = "s3:GetObject"
        Resource = "arn:aws:s3:::${aws_s3_bucket.deployment.id}/*"
      }
    ]
  })
}
