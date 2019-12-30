import userStore from 'utils/store/userStore';
import {
  QuizAnswerResponse,
  QuizDetailsInterface,
  QuizFulfillmentResponse,
  QuizInterface,
  SurveyInterface,
  SurveyDetailsInterface,
  SurveyFulfillmentResponse,
  RouteInterface,
  SignInResponseInterface,
  SiteInterface,
  AreaInterface,
  ItemInterface,
} from 'utils/interfaces';

abstract class Api {
  public static signIn = async (
    provider: string,
    accessToken: string,
  ): Promise<SignInResponseInterface> => {
    const body = {
      grant_type: 'convert_token',
      client_id: process.env.REACT_APP_CLIENT_ID,
      backend: provider,
      token: accessToken,
    };

    const response = await userStore.axiosInstance.post(
      'auth/convert-token',
      JSON.stringify(body),
    );

    return response.data;
  };

  public static getRoutes = async (): Promise<Array<RouteInterface>> => {
    const response = await userStore.axiosInstance.get('api/route/');

    return response.data;
  };

  public static getRoute = async (id: number): Promise<RouteInterface> => {
    const response = await userStore.axiosInstance.get(`api/route/${id}`);

    return response.data;
  };

  public static async getPrivateMedia(path: string): Promise<string> {
    const response = await userStore.axiosInstance.get(path, {
      responseType: 'arraybuffer',
    });

    const data = Buffer.from(response.data, 'binary').toString('base64');

    return `data:${response.headers['content-type']};base64,${data}`;
  }

  /**
   * Get list of all active quizzes.
   * Response will not include questions.
   *
   * @throws Axios error
   */
  public static async getQuizList(): Promise<Array<QuizInterface>> {
    const response = await userStore.axiosInstance.get('api/quiz');
    return response.data;
  }

  /**
   * Get quiz details.
   * Response will include quiz base data and questions list.
   *
   * If quiz is not active, has been deleted or was not created yet,
   * Axios Error will be thrown with status 404 and
   * response.data equal to {QuizDetailsNotFound}
   *
   * @param {number} id - Quiz ID
   * @throws Axios error
   */
  public static async getQuiz(id: number): Promise<QuizDetailsInterface> {
    const response = await userStore.axiosInstance.get(`api/quiz/${id}`);
    return response.data;
  }

  /**
   * Get a fulfillment for a quiz with a given id
   *
   * @param {number} id - Quiz ID
   * @throws Axios error
   */
  public static async getQuizFulfillment(
    id: number,
  ): Promise<QuizFulfillmentResponse> {
    const formData = new FormData();
    formData.append('quiz', id.toString());

    const response = await userStore.axiosInstance.post(
      'api/quiz-fulfillment/',
      formData,
    );
    return response.data;
  }

  /**
   * Check quiz answer
   *
   * @param {number} fulfillment - Fulfillment ID
   * @param {number} question - Question ID
   * @param {number} option - Option ID
   * @throws Axios error
   */
  public static async getQuizAnswer(
    fulfillment: number,
    question: number,
    option: number,
  ): Promise<QuizAnswerResponse> {
    const formData = new FormData();
    formData.append('fulfillment', fulfillment.toString());
    formData.append('question', question.toString());
    formData.append('options_data', option.toString());

    const response = await userStore.axiosInstance.post(
      'api/quiz-answer/',
      formData,
    );
    return response.data;
  }

  /**
   * Get list of all active surveys.
   *
   * @throws Axios error
   */
  public static async getSurveyList(): Promise<Array<SurveyInterface>> {
    const response = await userStore.axiosInstance.get('api/survey');
    return response.data;
  }

  /**
   * Get survey details
   *
   * @param {number} id - Quiz ID
   * @throws Axios error
   */
  public static async getSurveyDetails(
    id: number,
  ): Promise<SurveyDetailsInterface> {
    const response = await userStore.axiosInstance.get(`api/survey/${id}`);
    return response.data;
  }

  /**
   * Get a fulfillment for a survey with a given id
   *
   * @param {number} id - Survey ID
   * @throws Axios error
   */
  public static async getSurveyFulfillment(
    id: number,
  ): Promise<SurveyFulfillmentResponse> {
    const formData = new FormData();
    formData.append('survey', id.toString());

    const response = await userStore.axiosInstance.post(
      'api/survey-fulfillment/',
      formData,
    );

    return response.data;
  }

  /**
   * Check survey answer
   *
   * @param {number} fulfillment - Fulfillment ID
   * @param {number} question - Question ID
   * @param {string} value - Open answer
   * @param {Array<number>} options_data - Select and Multiselect
   * @throws Axios error
   */
  public static async getSurveyAnswer(
    fulfillment: number,
    question: number,
    value: string,
    options_data: Array<number>,
  ): Promise<void> {
    const formData = {
      fulfillment: fulfillment,
      question: question,
      value: value,
      options_data: options_data,
    };

    const response = await userStore.axiosInstance.post(
      'api/survey-answer/',
      formData,
    );

    return response.data;
  }

  /**
   * Get list of available languages
   */
  public static getLanguageList = async () => {
    const endpoint = 'api/language/';

    const response = await userStore.axiosInstance.get(endpoint);

    return response.data;
  };

  /**
   * Get list of sites
   * Only 1 site object should be present inside this "list"
   */
  public static getSiteData = async (): Promise<Array<SiteInterface>> => {
    const endpoint = 'api/site/';

    const response = await userStore.axiosInstance.get(endpoint);

    // Response should be an array with only one site object inside
    return response.data;
  };

  /**
   * Get list of areas
   */
  public static getAreaData = async (): Promise<Array<AreaInterface>> => {
    const endpoint = 'api/area/';

    const response = await userStore.axiosInstance.get(endpoint);

    // Response should be an array with only one site object inside
    return response.data;
  };

  public static getItemsList = async (): Promise<Array<ItemInterface>> => {
    const endpoint = 'api/item/';

    const response = await userStore.axiosInstance.get(endpoint);

    return response.data;
  };
}

export default Api;
