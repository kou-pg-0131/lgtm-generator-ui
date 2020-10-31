resource aws_s3_bucket deployment {
  bucket_prefix = "${local.prefix}-deployment"
  acl           = "private"
  force_destroy = true
  tags          = { Name = "${local.prefix}-deployment" }
}
