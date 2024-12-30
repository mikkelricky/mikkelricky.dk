<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Attribute\Route;
use Twig\Error\LoaderError;

class DefaultController extends AbstractController
{
    #[Route('/{path}', name: 'app_default', requirements: ['path' => '[^/].+'])]
    public function index(string $path = 'index'): Response
    {
        $parameters = [
            'path' => '/'.$path,
            'id' => preg_replace('/[^a-z0-9-]+/', '-', $path),
        ];

        try {
            return $this->render($path.'.html.twig', $parameters);
        } catch (LoaderError) {
            throw new NotFoundHttpException();
        } catch (\Exception $exception) {
            return $this->render('error.html.twig', $parameters + ['exception' => $exception])
              ->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
