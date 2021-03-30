import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Layout } from '../layout';
import { Title } from '../components';

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      fontSize: 28,
    },
  }),
);

const Precaution: React.FC = () => {
  const classes = useStyles();

  return (
    <Layout>
      <Title value='ご利用上の注意'/>
      <Box>
        <Typography className={classes.header} variant='h2'>ご利用上の注意</Typography>
        <ul>
          <li>本サービスを利用して生成された画像に関する一切の責任はご利用者様にご負担いただきます。ご利用者様が生成した画像に関し、第三者が損害を被った場合、運営者はご利用者様に代わっての責任は一切負いません。</li>
          <li>本サービスを利用して生成された画像は全世界に公開されます。</li>
          <li>元画像の著作権などに注意してください。公序良俗に反する画像や違法な画像を作成しないでください。これらの画像、その他運営者が不適切と判断した画像は予告無しに削除することがあります。</li>
          <li>過剰な数のリクエストを送信してサービスに負荷をかける行為はおやめください。</li>
          <li>悪質な利用方法が確認された場合、特定のご利用者様を予告無しにアクセス禁止にすることがあります。</li>
        </ul>
      </Box>
    </Layout>
  );
};

export default Precaution;
