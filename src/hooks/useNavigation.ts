import { useNavigate,useParams as useRouterParams } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();
  
  return {
    navigate,
    goBack: () => navigate(-1),
    goHome: () => navigate('/')
  };
};

type ParamType<T extends string> = {
    [key in T]: string;
  };
  
  export const useParams = <T extends string>(...params: T[]) => {
    const allParams = useRouterParams<ParamType<T>>();
    // 类型安全检查
    const missingParams = params.filter(p => !allParams[p]);
    if (missingParams.length > 0) {
      console.error(`Missing required params: ${missingParams.join(', ')}`);
    }
  
    return allParams as ParamType<T>;
  };