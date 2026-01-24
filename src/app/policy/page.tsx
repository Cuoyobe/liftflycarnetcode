'use client';

import { Navbar, Footer } from '@/components';

export default function PrivacyPolicyPage() {
    return (
        <main className="bg-deep-space min-h-screen">
            <Navbar />

            <div className="pt-32 pb-20 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-3xl md:text-5xl font-bold text-soft-white mb-6">
                        Cookie 使用及隐私政策
                    </h1>
                    <h2 className="text-xl md:text-2xl text-muted-gray font-medium">
                        Cookie Usage and Privacy Policy
                    </h2>
                </div>

                <div className="space-y-16 text-muted-gray leading-relaxed text-sm md:text-base">
                    {/* 中文部分 */}
                    <div className="space-y-8">
                        <section className="space-y-4">
                            <h3 className="text-xl font-bold text-soft-white">1. 常规</h3>
                            <p>
                                感谢您对我们杭州领飞特科技有限公司产品的支持以及对我们服务网站的访问，以下简称为“我们”。对于本政策内容有任何疑问，可以通过加入社群与我们取得联系。
                            </p>
                            <p>本政策内容的最后更新时间为：2025年01月10日</p>
                            <p>我们尊重用户的隐私权，我们采取和技术措施尽我们所能阻止第三方影响用户隐私。</p>
                            <p>本政策描述：</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>我们从你那里收集哪些信息</li>
                                <li>我们如何使用和分享这些信息</li>
                                <li>您关于这些信息的权利和选择</li>
                                <li>关于Cookie的使用及设置</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h3 className="text-xl font-bold text-soft-white">2. 我们从你那里收集哪些信息</h3>
                            <p>
                                我们可能会直接从您、第三方以及您使用我们产品和服务时自动收集您的信息、统称“网络信息”。但通常您的网络信息仅限于识别您对我们服务网站的访问数据，网络信息不会存储于我们的数据库中。
                            </p>
                            <p>
                                我们从您处收集的一些信息在本政策中被称为“个人信息”。个人信息是指能够识别您的身份或我们能与您相关的数据，例如您的姓名、电子邮件地址、电话号码和收货地址。这些数据需要您主动提供，在您没有提供时，可能会影响我们后续对您的服务，但不会影响您对我们服务网站的浏览。
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h3 className="text-xl font-bold text-soft-white">3. 我们如何使用和分享这些信息</h3>
                            <p>
                                我们通过识别您的网络信息，对您的访问进行相应的的定制化体验。例如：通过您的访问位置，为您进行网页加速、和提供适用于您语言环境的内容展示。
                            </p>
                            <p>
                                在您提供个人信息后，我们会根据您的个人信息对您的需求进行服务。您的信息可能由第三方运营公司提供，请查看和仔细了解其隐私政策和使用条款。
                            </p>
                            <p>
                                当前，我们不会与任何第三方共享用户个人信息。如果您的信息由第三方运营公司在传递过程中发生信息泄露，我们无法对该情况负责。
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h3 className="text-xl font-bold text-soft-white">4. 您关于这些信息的权利和选择</h3>
                            <p>
                                在没有您的主动提供个人信息的条件下，我们不存储您的任何个人信息，当您退出我们服务网站以后，您就不会有任何信息被我们收集。如果您想要与我们建立联系，您只需要打开网站向我们提供信息即可。此外，如果某些信息已如本政策所述提供给第三方，则该信息的保留将受该第三方政策的约束。
                            </p>
                            <p>
                                如果您希望行使适用数据保护法下的其他权利，包括访问、修改或删除我们持有的任何关于您的信息的权利，您可以 <span className="text-accent">support@liftflycar.com</span> 联系我们。
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h3 className="text-xl font-bold text-soft-white">5. 关于Cookie的使用及设置</h3>
                            <p>
                                当您使用我们的在线服务时，我们可能会向您发送一个或多个Cookie——包含字母数字字符串的小文本文件。我们可能会同时使用会话Cookie和持久Cookie。会话Cookie在您关闭浏览器后会消失。持久Cookie在您关闭浏览器后仍会保留，并可能在后续访问服务时被浏览器使用。请查看您的浏览器“帮助”文件，了解如何正确修改Cookie设置。我们也可能使用第三方Cookie。我们不处理或响应浏览器发出的“请勿追踪”信号或其他类似传输，这些信号通常表明请求关闭我们服务用户的在线追踪。
                            </p>
                            <p>
                                Cookie文件不包含可用于识别用户的信息，也无法确定用户的个人数据。您可以通过调整所用浏览器的设置来更改收集的数据范围。为了根据您的需求适当调整设置并更改存储或接收Cookie的条件，我们建议选择某一浏览器的“帮助”选项。关于Cookie的更多信息可在 <a href="https://en.wikipedia.org/wiki/HTTP_cookie" target="_blank" rel="noopener noreferrer" className="text-accent underline">https://en.wikipedia.org/wiki/HTTP_cookie</a> 或网页浏览器菜单的“帮助”部分找到。每个用户都可以设置隐私级别和 Cookie 的类型。
                            </p>
                        </section>
                    </div>

                    <div className="w-full h-px bg-outline-border my-12" />

                    {/* English Section */}
                    <div className="space-y-8">
                        <section className="space-y-4">
                            <h3 className="text-xl font-bold text-soft-white">1. General Provisions</h3>
                            <p>
                                Thank you for your support of the products of our company, Hangzhou Lingfeite Technology Co., Ltd., and for visiting our service website (hereinafter referred to as "we"). If you have any questions about the content of this policy, you may contact us by joining our community.
                            </p>
                            <p>Last updated date of this policy: January 10, 2025</p>
                            <p>We respect users' right to privacy and take technical measures to do our utmost to prevent third parties from affecting users' privacy.</p>
                            <p>This policy describes:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>What information we collect from you</li>
                                <li>How we use and share this information</li>
                                <li>Your rights and choices regarding this information</li>
                                <li>Usage and settings of Cookies</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h3 className="text-xl font-bold text-soft-white">2. What Information We Collect from You</h3>
                            <p>
                                We may collect information about you directly from you, from third parties, and automatically when you use our products and services (collectively referred to as "network information"). However, your network information is usually limited to data identifying your visits to our service website, and such network information will not be stored in our database.
                            </p>
                            <p>
                                Some of the information we collect from you is referred to as "personal information" in this policy. Personal information refers to data that can identify your identity or that we can associate with you, such as your name, email address, phone number, and shipping address. Such data requires your active provision. If you do not provide it, it may affect our subsequent services to you, but will not affect your browsing of our service website.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h3 className="text-xl font-bold text-soft-white">3. How We Use and Share This Information</h3>
                            <p>
                                By identifying your network information, we provide you with a corresponding customized experience for your visits. For example: based on your visit location, we accelerate web pages for you and provide content display suitable for your language environment.
                            </p>
                            <p>
                                After you provide your personal information, we will provide services according to your needs based on your personal information. Your information may be provided by a third-party operating company; please review and carefully understand its privacy policy and terms of use.
                            </p>
                            <p>
                                Currently, we will not share users' personal information with any third parties. If your information is leaked by a third-party operating company during transmission, we cannot be held responsible for such situation.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h3 className="text-xl font-bold text-soft-white">4. Your Rights and Choices Regarding This Information</h3>
                            <p>
                                In the absence of your active provision of personal information, we will not store any of your personal information. After you exit our service website, no information about you will be collected by us. If you wish to contact us, you only need to open the website and provide information to us. In addition, if certain information has been provided to third parties as described in this policy, the retention of such information will be subject to the policies of such third parties.
                            </p>
                            <p>
                                If you wish to exercise other rights under applicable data protection laws, including the right to access, correct, or delete any information about you that we hold, you may contact us at <span className="text-accent">support@liftflycar.com</span>.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h3 className="text-xl font-bold text-soft-white">5. Usage and Settings of Cookies</h3>
                            <p>
                                When you use our online services, we may send you one or more Cookies — small text files containing alphanumeric strings. We may use both session Cookies and persistent Cookies. Session Cookies will be deleted when you close your browser. Persistent Cookies will remain after you close your browser and may be used by the browser during subsequent visits to the services. Please refer to your browser's "Help" file to learn how to correctly modify Cookie settings. We may also use third-party Cookies. We do not process or respond to "Do Not Track" signals or other similar transmissions sent by browsers, which usually indicate a request to turn off online tracking of users of our services.
                            </p>
                            <p>
                                Cookie files do not contain information that can be used to identify users, nor can they determine users' personal data. You can change the scope of collected data by adjusting the settings of the browser you use. To properly adjust settings according to your needs and change the conditions for storing or receiving Cookies, we recommend selecting the "Help" option of a certain browser. For more information about Cookies, you can find it at <a href="https://en.wikipedia.org/wiki/HTTP_cookie" target="_blank" rel="noopener noreferrer" className="text-accent underline">https://en.wikipedia.org/wiki/HTTP_cookie</a> or in the "Help" section of the web browser menu. Each user can set the privacy level and the type of Cookies.
                            </p>
                        </section>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
